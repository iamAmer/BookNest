import React from 'react'

export default function Footer() {
  return <>
    <footer className="border-t mt-14 bg-[#FFFFFF]">
      <div className="mx-auto w-full max-w-7xl p-2 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="/" className="flex items-center mb-4">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-7 me-3"
                alt="Logo"
              />
              <span className="text-heading text-2xl font-semibold whitespace-nowrap">
                BookNest
              </span>
            </a>
            <div className='mb-4'>
              <p>Your Personal reading sanctuary, Discover, read, and organize your favorite books all in one place</p>
            </div>
            <div className="flex mt-4 sm:mt-0">
            social media
            </div>
          </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-heading uppercase">
                Quick Links
              </h3>
              <ul className="text-body font-medium space-y-2">
                <li><a className="hover:underline">Home</a></li>
                <li><a className="hover:underline">Categories</a></li>
                <li><a className="hover:underline">Improve language</a></li>
                <li><a className="hover:underline">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-heading uppercase">
                Support
              </h3>
              <ul className="text-body font-medium space-y-2">
                <li><a className="hover:underline">Help Center</a></li>
                <li><a className="hover:underline">Privacy Policy</a></li>
                <li><a className="hover:underline">Terms Of Service</a></li>
                <li><a className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
        </div>

        <hr className="my-6 border-default opacity-20 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-body sm:text-center">© 2025 <a href="https://flowbite.com/" className="hover:underline">BookNest</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>

  </>
}
