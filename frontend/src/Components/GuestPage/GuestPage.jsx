// import React from 'react'
// import ShareSection from '../SharSections/ShareSection.jsx'
// import { NavLink } from 'react-router-dom'

// export default function GuestPage() {
//   return <>
//     <section className="bg-[linear-gradient(135deg,#F8F6F3_0%,rgba(245,230,211,0.4)_50%,#F8F6F3_100%)] relative">
//         <div className="mx-auto max-w-6xl px-6  text-center h-svh flex flex-col justify-center items-center">
          
//           <h1 className="text-4xl md:text-5xl lg:text-6xl header-font text-[#4A3D2F] leading-tight">
//             Welcome to BookNest
//           </h1>

//           <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-[#6B5744] leading-relaxed">
//             Join thousands of readers discovering new books every day.
//             Start your reading journey with personalized recommendations.
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               className="rounded-full border border-[#E8D4B8] bg-white px-6 py-3 text-sm font-medium text-[#4A3D2F] shadow-md hover:bg-[#F5E6D3] transition"
//             >
//               <NavLink to={'/login'}>Login</NavLink>
//             </button>
//             <button
//               className="rounded-full px-6 py-3 text-sm font-semibold text-white 
//               bg-linear-to-b from-[#D4A574] to-[#C39563] 
//               shadow-md hover:shadow-lg transition"
//             >
//               <NavLink to={'/register'}>Sign Up Now</NavLink>
//             </button>
//           </div>
//           <div className='flex justify-center items-center gap-6 mt-8'>
//             <div><i class="fa-solid fa-book-open text-[#D4A574]"></i><span className='text-[#726353]'>10,000+ Books</span></div>
//             <div><i class="fa-regular fa-heart text-[#D4A574]"></i><span className='text-[#726353]'>5,000+ Readers</span></div>
//             <div><i class="fa-regular fa-star text-[#D4A574]"></i> <span className='text-[#726353]'>Free to Join</span></div>
//           </div>
//         </div>
//         <div className='w-28 h-28 opacity-5 absolute left-[736.01px] top-47.5'>
//           <i class="fa-regular fa-star text-[#D4A574] text-7xl"></i>
//         </div>
//         <div className='w-24 h-24 opacity-5 absolute left-[318px] top-[236.1px]'>
//           <i class="fa-regular fa-heart text-[#D4A574] text-7xl"></i>
//         </div>
//         <div className='w-40 h-40 opacity-5 absolute left-198.5 top-25'>
//           <i class="fa-solid fa-book-open text-[#D4A574] text-9xl"></i>
//         </div>
//         <div></div>
//         <div></div>
//       </section>
//     <ShareSection/>

//   </>
// }


import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ShareSection from '../SharSections/ShareSection.jsx'
import { NavLink } from 'react-router-dom'

export default function GuestPage() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    })
  }, [])

  const words = [
    'vocabulary', 'comprehension', 'storytelling',
    'fluency', 'grammar in context', 'idioms', 'reading habits'
  ]

  return <>
    <section
      className="relative overflow-hidden min-h-svh flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#F8F6F3 0%,rgba(245,230,211,0.45) 50%,#F8F6F3 100%)' }}
    >
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="absolute left-10 top-32 text-[120px] text-[#8B5E2E] opacity-[0.04] leading-none">A</span>
        <span className="absolute right-16 bottom-24 text-[90px] text-[#8B5E2E] opacity-[0.04] leading-none">Z</span>
        <span className="absolute left-1/2 top-8 -translate-x-1/2 text-[60px] text-[#8B5E2E] opacity-[0.04] leading-none">abc</span>
        <div className="absolute w-40 h-40 rounded-full top-16 left-24 opacity-[0.06] bg-[#D4A574]" />
        <div className="absolute w-56 h-56 rounded-full bottom-16 right-16 opacity-[0.06] bg-[#D4A574]" />
      </div>

      <div className="relative z-10 text-center px-6 py-20 max-w-xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wide mb-6"
          style={{ background: 'rgba(212,165,116,0.15)', border: '1px solid rgba(212,165,116,0.35)', color: '#9B7347' }}
          data-aos="fade-down"
          data-aos-delay="0"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4A574]" />
          For English learners worldwide
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-[60px] font-bold leading-tight text-[#3D2F20] mb-4"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          Read your way to{' '}
          <span className="text-[#C38848]">fluent English</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-[#7A6050] leading-relaxed mb-7 text-base md:text-[15px]"
          data-aos="fade-up"
          data-aos-delay="240"
        >
          BookNest helps you discover great books while naturally building your English —
          whether you're <strong className="text-[#5C4428] font-medium">intermediate, advanced,</strong> or anywhere in between.
        </p>

        {/* Word pills */}
        <div
          className="flex flex-wrap justify-content-center gap-1.5 mb-7 max-w-sm mx-auto opacity-75"
          data-aos="fade-up"
          data-aos-delay="340"
        >
          {words.map(w => (
            <span
              key={w}
              className="px-2 py-0.5 rounded-md text-[11px] text-[#A07840]"
              style={{
                background: 'rgba(212,165,116,0.12)',
                border: '1px solid rgba(212,165,116,0.25)'
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
          data-aos="zoom-in"
          data-aos-delay="440"
        >
          <NavLink to="/register">
            <button
              className="rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
              style={{ background: 'linear-gradient(160deg,#D4A574,#C08040)' }}
            >
              Start reading free
            </button>
          </NavLink>
          <NavLink to="/login">
            <button
              className="rounded-full px-7 py-3 text-sm text-[#5C4428] bg-white hover:bg-[#FDF3E7] transition"
              style={{ border: '1.5px solid #E2C89A' }}
            >
              Sign in
            </button>
          </NavLink>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-5 flex-wrap text-sm text-[#8A6B50]"
          data-aos="fade"
          data-aos-delay="560"
        >
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-book-open text-[#D4A574] text-xs" />
            10,000+ books
          </div>
          <div className="w-px h-4 bg-[#D4C0A0] opacity-50" />
          <div className="flex items-center gap-1.5">
            <i className="fa-regular fa-heart text-[#D4A574] text-xs" />
            5,000+ readers
          </div>
          <div className="w-px h-4 bg-[#D4C0A0] opacity-50" />
          <div className="flex items-center gap-1.5">
            <i className="fa-regular fa-star text-[#D4A574] text-xs" />
            free to join
          </div>
        </div>

      </div>
    </section>

    <ShareSection />
  </>
}