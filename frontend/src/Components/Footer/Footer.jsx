import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

const SOCIAL_LINKS = [
  { icon: "fa-brands fa-facebook-f", href: "#", label: "Facebook" },
  { icon: "fa-brands fa-x-twitter", href: "#", label: "Twitter" },
  { icon: "fa-brands fa-instagram", href: "#", label: "Instagram" },
  { icon: "fa-brands fa-goodreads-g", href: "#", label: "Goodreads" },
]

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "category" },
  { label: "Improve Language", to: "/" },
  { label: "About", to: "about" },
]

const SUPPORT_LINKS = [
  "Help Center", "Privacy Policy", "Terms Of Service", "Contact Us"
]

export default function Footer() {
  return (
    <footer className="border-t border-[#000000] bg-white mt-[56px] ">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <NavLink to="/" className="flex items-center gap-2.5 mb-4">
              <Logo/>
              <span className="text-[#4A3D2F] text-[16px] font-bold tracking-tight">BookNest</span>
            </NavLink>
            <p className="text-[#4A3D2F] text-sm leading-relaxed mb-5">
              Your personal reading sanctuary. Discover, read, and organize your favorite books all in one place.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#F8F6F3] flex items-center justify-center text-[#4A3D2F] hover:bg-[#795420] hover:text-white transition-colors text-sm"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#4A3D2F] uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className="text-sm text-[#4A3D2F] hover:text-[#795420] transition-colors"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#4A3D2F] uppercase tracking-widest mb-5">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#4A3D2F] hover:text-[#795420] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <hr className="my-8 border-[#EDE0CF]" /> */}
        <div className='pt-[32.8px] border-t border-[#E8D4B8] mt-8'>
          <p className="text-center text-sm text-[#726353]">
          © 2025{' '}
          <NavLink to="/" className="text-[#795420] hover:underline font-medium">
            BookNest
          </NavLink>
          . All Rights Reserved.
        </p>
        </div>
      </div>
    </footer>
  )
}