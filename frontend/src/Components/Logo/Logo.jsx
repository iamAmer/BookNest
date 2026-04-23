// import React from "react";

// export default function Logo() {
//   return (
//     <div className="w-8 h-8 rounded-lg bg-[#D4A574] flex items-center justify-center border border-[#B8915F] relative gap-0.5">
//       <div className="w-2 h-5.25 bg-[#F5E6D3] rounded-bl-xs flex flex-col items-center gap-0.5 pt-0.5">
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//       </div>
//       <div className="w-2 h-5.25 bg-[#F5E6D3] rounded-br-xs flex flex-col items-center gap-0.5 pt-0.5">
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//         <div className="w-[4.8px] border-[0.6px] border-[#D4A574]"></div>
//       </div>
//     </div>
//   );
// }


export default function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bn-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#D4A574" />
          <stop offset="100%" stopColor="#B8732A" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="32" height="32" rx="8" fill="url(#bn-bg)" />

      {/* Nest arch — the signature mark */}
      <path d="M16 8 C11 8 7 11 7 14.5"  stroke="#F5E6D3" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <path d="M16 8 C21 8 25 11 25 14.5" stroke="#F5E6D3" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />

      {/* Left book spine */}
      <rect x="8" y="14" width="5.5" height="10" rx="1" fill="#F5E6D3" />
      <line x1="9.5" y1="17" x2="12" y2="17" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="9.5" y1="19" x2="12" y2="19" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="9.5" y1="21" x2="12" y2="21" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />

      {/* Center book spine — tallest, hero book */}
      <rect x="14.5" y="13" width="5.5" height="11" rx="1" fill="#FDF8F3" />
      <line x1="16"  y1="16" x2="18.5" y2="16" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="16"  y1="18" x2="18.5" y2="18" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="16"  y1="20" x2="18.5" y2="20" stroke="#C08040" strokeWidth="0.8" strokeLinecap="round" />

      {/* Right book + bookmark ribbon */}
      <rect x="20.5" y="14" width="3.5" height="10" rx="1" fill="#EDD8B8" opacity="0.85" />
      <path
        d="M21.5 20 L21.5 24 L23.25 22.5 L23.25 24"
        stroke="#C08040" strokeWidth="0.7"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}