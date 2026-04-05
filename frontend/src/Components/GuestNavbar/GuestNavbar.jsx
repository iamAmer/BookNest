import React from 'react'
import { NavLink } from 'react-router-dom'

export default function GuestNavbar() {
  return <>
    <header className="bg-white">
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
      <div className="flex lg:flex-1">
        <NavLink href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt className="h-8 w-auto" />
        </NavLink>
      </div>
      <div className="flex lg:hidden">
        <button type="button" command="show-modal" commandfor="mobile-menu" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <NavLink className="text-sm/6 font-semibold text-gray-900">Home</NavLink>
        <NavLink to={'Category'} className="text-sm/6 font-semibold text-gray-900">Categories</NavLink>
        <NavLink to={'about'} className="text-sm/6 font-semibold text-gray-900">About</NavLink>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-6 items-center">
        <NavLink to={'login'} className="text-sm/6 font-semibold text-gray-900">Log in</NavLink>
        <NavLink
          to="register"
          className="rounded-full px-5 py-2 font-semibold 
                    bg-linear-to-b from-[#D4A574] to-[#C39563] 
                    text-white 
                    transition-all duration-200 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                    
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
    <div>
      <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
        <div tabIndex={0} className="fixed inset-0 focus:outline-none">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt className="h-8 w-auto" />
              </NavLink>
              <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="-mx-3">
                  </div>
                  <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</NavLink>
                  <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</NavLink>
                  <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</NavLink>
                </div>
                <div className="py-6">
                  <NavLink to={'login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</NavLink>
                  <NavLink to={'register'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Sign Up</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
    </header>
  </>
}
