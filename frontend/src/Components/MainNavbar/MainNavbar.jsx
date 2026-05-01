import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import Logo from "../Logo/Logo.jsx";

export default function MainNavbar() {
  let navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [navProfileImage, setNavProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/");
  }

  useEffect(() => {
    const saved = localStorage.getItem("profileImage");
    if (saved) setNavProfileImage(saved);

    const handleUpdate = () => {
      const updated = localStorage.getItem("profileImage");
      setNavProfileImage(updated);
    };

    window.addEventListener("profileImageUpdated", handleUpdate);
    return () =>
      window.removeEventListener("profileImageUpdated", handleUpdate);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-[#FFFFFF] header-font shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0px_rgba(0,0,0,0.1)] mb-1">
        <nav
          aria-label="Global"
          className="mx-auto flex items-center justify-between py-2 px-3 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <NavLink to="#" className="flex items-center gap-2.5 shrink-0">
              <Logo />
              <span className="text-[#4A3D2F] text-xl tracking-tight">
                BookNest
              </span>
            </NavLink>
          </div>

          {/* Mobile: avatar with dropdown + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Avatar dropdown (mobile only) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="rounded-full bg-[#C4A574] w-9 h-9 flex justify-center items-center overflow-hidden focus:outline-none"
              >
                {navProfileImage ? (
                  <img
                    src={navProfileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <i className="fa-regular fa-user text-[#FFFFFF]"></i>
                )}
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] border border-[#E8D4B8] z-50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-[#F5E6D3]">
                    <p className="text-xs text-[#A0907D] truncate">
                      {userData?.email?.split("@")[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("profile");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#4A3D2F] hover:bg-[#F5E6D3] flex items-center gap-2 transition-colors"
                  >
                    <i className="fa-regular fa-user text-[#C4A574] w-4"></i>
                    Your Profile
                  </button>
                  {userData?.isAdmin && (
                    <button
                      onClick={() => {
                        navigate("admin");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#8B6F47] hover:bg-[#F5E6D3] flex items-center gap-2 transition-colors"
                    >
                      <i className="fa-solid fa-shield-halved text-[#C4A574] w-4"></i>
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logOut();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#4A3D2F] hover:bg-[#F5E6D3] flex items-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket text-[#C4A574] w-4"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger */}
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

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:gap-x-12 items-center">
            <NavLink to={"/home"} className="text-sm/6 text-gray-900">
              Home
            </NavLink>
            <NavLink to={"category"} className="text-sm/6 text-gray-900">
              Categories
            </NavLink>
            <NavLink to={"learnlanguage"} className="text-sm/6 text-gray-900">
              Learn Language
            </NavLink>
            {userData?.isAdmin && (
              <NavLink to={"admin"} className="text-sm/6 text-[#8B6F47] font-medium">
                <i className="fa-solid fa-shield-halved mr-1"></i>Admin
              </NavLink>
            )}
            <NavLink
              to={"kids"}
              className="text-sm/6 text-gray-900 bg-[#FFE8F0] px-5 py-2 rounded-2xl shadow-[0_1px_3px_0px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] border-[0.8px] border-[#FFD4E5]"
            >
              <i className="fa-regular fa-face-smile"></i> Kids
            </NavLink>
          </div>

          {/* Desktop avatar + logout */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2 items-center">
            <NavLink to={"profile"}>
              <button className="text-sm/6 font-semibold text-gray-900 px-3 flex gap-3 items-center cursor-pointer">
                <div className="rounded-[26843500px] bg-[#C4A574] w-9 h-9 flex justify-center items-center overflow-hidden">
                  {navProfileImage ? (
                    <img
                      src={navProfileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <i className="fa-regular fa-user text-[#FFFFFF]"></i>
                  )}
                </div>
                <p className="text-[#4A3D2F]">
                  {userData?.email?.split("@")[0]}
                </p>
              </button>
            </NavLink>
            <button
              onClick={() => logOut()}
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-[#4A3D2F]"></i>
            </button>
          </div>
        </nav>

        {/* Mobile dialog (unchanged) */}
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
                      <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Features
                      </NavLink>
                      <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Marketplace
                      </NavLink>
                      <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Company
                      </NavLink>
                    </div>
                    <div className="py-6">
                      <NavLink
                        to={"login"}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </NavLink>
                      <NavLink
                        to={"register"}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
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
