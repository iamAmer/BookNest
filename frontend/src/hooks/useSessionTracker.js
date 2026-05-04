import { useEffect, useRef } from 'react'
import { profileService } from '../services/profile.service'

export function useSessionTracker(userId) {
  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!userId) return

    // Start tracking when component mounts
    startTimeRef.current = Date.now()

    // Save time every 5 minutes (300000 ms)
    intervalRef.current = setInterval(() => {
      saveTime()
    }, 300000)

    // Save time when user leaves/closes tab
    function handleBeforeUnload() {
      saveTime()
    }

    // Save time when tab becomes hidden (user switches tabs/minimizes)
    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        saveTime()
      } else if (document.visibilityState === 'visible') {
        // Resume tracking when tab becomes visible again
        startTimeRef.current = Date.now()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      // Save remaining time on unmount
      saveTime()
      clearInterval(intervalRef.current)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [userId])

  const saveTime = async () => {
    if (!startTimeRef.current || !userId) return

    const now = Date.now()
    const sessionTime = now - startTimeRef.current
    const seconds = Math.floor(sessionTime / 1000)

    if (seconds < 1) return

    try {
      await profileService.update({ total_site_time_seconds: seconds })
      // Reset start time for next interval
      startTimeRef.current = Date.now()
    } catch {
      // Silently fail - will retry on next save
    }
  }
}
