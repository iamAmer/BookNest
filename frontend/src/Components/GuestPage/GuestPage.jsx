import React from 'react'
import ShareSection from '../SharSections/ShareSection.jsx'
import { NavLink } from 'react-router-dom'

export default function GuestPage() {
  return <>
    <section className="bg-linear-to-b from-[#F8F6F3] via-[#F5E6D3] to-[#F8F6F3] relative">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl header-font text-[#4A3D2F] leading-tight">
            Welcome to BookNest
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-[#6B5744] leading-relaxed">
            Join thousands of readers discovering new books every day.
            Start your reading journey with personalized recommendations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="rounded-full border border-[#E8D4B8] bg-white px-6 py-3 text-sm font-medium text-[#4A3D2F] shadow-md hover:bg-[#F5E6D3] transition"
            >
              <NavLink to={'/login'}>Login</NavLink>
            </button>
            <button
              className="rounded-full px-6 py-3 text-sm font-semibold text-white 
              bg-linear-to-b from-[#D4A574] to-[#C39563] 
              shadow-md hover:shadow-lg transition"
            >
              <NavLink to={'/register'}>Sign Up Now</NavLink>
            </button>
          </div>
          <div className='flex justify-center items-center gap-6 mt-8'>
            <div><i class="fa-solid fa-book-open text-[#D4A574]"></i><span className='text-[#726353]'>10,000+ Books</span></div>
            <div><i class="fa-regular fa-heart text-[#D4A574]"></i><span className='text-[#726353]'>5,000+ Readers</span></div>
            <div><i class="fa-regular fa-star text-[#D4A574]"></i> <span className='text-[#726353]'>Free to Join</span></div>
          </div>
        </div>
        <div className='w-28 h-28 opacity-5 absolute left-[736.01px] top-47.5'>
          <i class="fa-regular fa-star text-[#D4A574] text-7xl"></i>
        </div>
        <div className='w-24 h-24 opacity-5 absolute left-[318px] top-[236.1px]'>
          <i class="fa-regular fa-heart text-[#D4A574] text-7xl"></i>
        </div>
        <div className='w-40 h-40 opacity-5 absolute left-198.5 top-25'>
          <i class="fa-solid fa-book-open text-[#D4A574] text-9xl"></i>
        </div>
      </section>
    <ShareSection/>

  </>
}
