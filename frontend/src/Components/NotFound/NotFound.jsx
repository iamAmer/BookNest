import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return <>
   <main className="grid min-h-full place-items-center bg-linear-to-b from-[#F8F6F3] via-[#F5E6D3] via-[40%] to-[#F8F6F3] bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-base font-semibold text-red-900">404</p>
    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[#4A3D2F] sm:text-7xl">Page not found</h1>
    <p className="mt-6 text-lg font-medium text-pretty text-[#726353] sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <NavLink to='/' className=" bg-linear-to-b from-[#D4A574] to-[#C39563] px-3.5 py-2.5 rounded-4xl text-sm font-semibold special shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ">Go back home</NavLink>
      {/* <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">→</span></a> */}
    </div>
  </div>
</main>

  </>
}
