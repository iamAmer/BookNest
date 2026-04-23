import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "category" },
  { label: "About", to: "about" },
];

export default function GuestNavbar() {
  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10"
        >
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <Logo />
            <span className="text-[#4A3D2F] text-xl tracking-tight">
              BookNest
            </span>
          </NavLink>
          <div className="flex lg:hidden">
            <button
              type="button"
              command="show-modal"
              commandfor="mobile-menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-[#D4A574]"
                      : "text-[#726353] hover:text-[#795420]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="login"
              className="text-sm font-medium text-[#4A3D2F] hover:text-[#795420] transition-colors"
            >
              Log in
            </NavLink>
            <NavLink
              to="register"
              className="rounded-full px-5 py-2 text-sm font-semibold bg-[linear-gradient(180deg,#D4A574_0%,#C39563_100%)] text-white hover:bg-[#6a4a1c] transition-colors shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]"
            >
              Sign Up
            </NavLink>
          </div>
        </nav>
        {/* ///////////////////////////////////// */}
        <div>
          <dialog
            id="mobile-menu"
            className="backdrop:bg-transparent lg:hidden"
          >
            <div tabIndex={0} className="fixed inset-0 focus:outline-none">
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <NavLink
                    to="/"
                    className="flex items-center gap-2.5 shrink-0"
                  >
                    <Logo />
                    <span className="text-[#4A3D2F] text-xl tracking-tight">
                      BookNest
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    command="close"
                    commandfor="mobile-menu"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      data-slot="icon"
                      aria-hidden="true"
                      className="size-6"
                    >
                      <path
                        d="M6 18 18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {NAV_LINKS.map(({ label, to }) => (
                        <NavLink
                          key={label}
                          to={to}
                          className={({ isActive }) =>
                            `-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-gray-50 ${
                              isActive
                                ? "text-[#795420]"
                                : "text-[#726353] hover:text-[#795420]"
                            }`
                          }
                        >
                          {label}
                        </NavLink>
                      ))}
                    </div>
                    <div className="py-6">
                      <NavLink
                        to={"login"}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </NavLink>
                      <NavLink
                        to={"register"}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7  text-gray-900 hover:bg-gray-50"
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </header>
    </>
  );
}
