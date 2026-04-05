import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext.jsx';

export default function MainNavbar() {
  let navigate = useNavigate();
  const { userData } = useContext(UserContext);
  function logOut(){
    localStorage.removeItem('userToken');
    navigate('/');
  }

  return <>
    <header className="bg-[#FFFFFF] header-font shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0px_rgba(0,0,0,0.1)] mb-1">
    <nav aria-label="Global" className="mx-auto flex  items-center justify-between px-3 lg:px-8">
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
      <div className="hidden lg:flex lg:gap-x-12 items-center">
        <NavLink to={'/home'} className="text-sm/6  text-gray-900">Home</NavLink>
        <NavLink to={'category'} className="text-sm/6  text-gray-900">Categories</NavLink>
        <NavLink to={'learnlanguage'} className="text-sm/6  text-gray-900">Learn Language</NavLink>
        <NavLink to={'about'} className="text-sm/6  text-gray-900">About</NavLink>
        <NavLink to={'kids'} className="text-sm/6  text-gray-900 bg-[#FFE8F0] px-5 py-2 rounded-2xl shadow-[0_1px_3px_0px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] border-[0.8px] border-[#FFD4E5]"> <i class="fa-regular fa-face-smile"></i> Kids</NavLink>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2 items-center">
        <NavLink to={'profile'}><button className="text-sm/6 font-semibold text-gray-900 px-3 flex gap-3 items-center cursor-pointer"><div className='rounded-[26843500px] bg-[#C4A574] w-9 h-9 flex justify-center items-center'><i className="fa-regular fa-user text-[#FFFFFF]"></i></div> <p className='text-[#4A3D2F]'>{userData?.name}</p></button></NavLink>
        <button onClick={()=> logOut()} className="text-sm/6 font-semibold text-gray-900 cursor-pointer"><i className="fa-solid fa-arrow-right-from-bracket text-[#4A3D2F]"></i></button>
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
