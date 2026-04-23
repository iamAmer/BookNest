// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function About() {
//   let navigate = useNavigate();
//   return (
//     <>
//       <div className="bg-[#F8F6F3] px-6 sm:px-16 md:px-24 lg:px-39 py-10 sm:py-20 lg:py-32">
//         <div className="text-center px-4 sm:px-12 md:px-24 lg:px-45">
//           <h1 className="text-[36px] sm:text-[48px] lg:text-[60px] text-[#6B5744] font-normal">
//             About BookNest
//           </h1>
//           <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#A0907D]">
//             A warm, welcoming platform for discovering, reading, and exploring
//             books for everyone.
//           </p>
//         </div>

//         <div className="mt-10 sm:mt-16 rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#FFFFFF] shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]">
//           <div className="flex flex-col gap-6 items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]">
//               <i className="fa-solid fa-book-open text-3xl sm:text-4xl text-[#D4A574]"></i>
//             </div>
//             <div className="text-center w-full sm:w-3/4 lg:w-162.5">
//               <h2 className="text-xl sm:text-2xl text-[#6B5744]">
//                 Our Mission
//               </h2>
//               <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#A0907D] mt-4">
//                 BookNest was created to make reading accessible and enjoyable
//                 for everyone. Whether you're discovering new stories, improving
//                 your language skills, or sharing the joy of reading with
//                 children, we provide a thoughtful, distraction-free space where
//                 books come to life.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 lg:mt-16">
//           <div className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center">
//               <i className="fa-solid fa-swatchbook text-3xl sm:text-4xl text-[#6B9AFF]"></i>
//             </div>
//             <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
//               Discover Books
//             </h3>
//             <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
//               Browse curated collections across all genres
//             </p>
//           </div>

//           <div className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center">
//               <i className="fa-solid fa-language text-3xl sm:text-4xl text-[#6B9AFF]"></i>
//             </div>
//             <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
//               Improve Your Language
//             </h3>
//             <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
//               Learn with structured reading levels
//             </p>
//           </div>

//           <div className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#FFE5F0] to-[#FFF0F8] flex justify-center items-center">
//               <i className="fa-regular fa-star text-3xl sm:text-4xl text-[#FF6B9D]"></i>
//             </div>
//             <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
//               Enjoy Kids Stories
//             </h3>
//             <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
//               Safe, colorful reading for young learners
//             </p>
//           </div>
//         </div>

//         <div className="bg-gradient-to-b from-[#D4A574] to-[#B8915F] mt-10 sm:mt-16 rounded-3xl shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A] p-6 sm:p-8 text-center">
//           <h3 className="text-xl sm:text-2xl text-[#FFFFFF]">
//             Ready to start reading?
//           </h3>
//           <button
//             onClick={() => navigate("/home")}
//             className="rounded-2xl bg-[#FFFFFF] px-6 py-3 text-sm text-[#D4A574] mt-4 cursor-pointer"
//           >
//             Explore Books
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  let navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div className="bg-[#F8F6F3] px-6 sm:px-16 md:px-24 lg:px-39 py-10 sm:py-20 lg:py-32">

        {/* ── Hero heading ── */}
        <div
          data-aos="fade-down"
          className="text-center px-4 sm:px-12 md:px-24 lg:px-45"
        >
          <h1 className="text-[36px] sm:text-[48px] lg:text-[60px] text-[#6B5744] font-normal">
            About BookNest
          </h1>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#A0907D]">
            A warm, welcoming platform for discovering, reading, and exploring
            books for everyone.
          </p>
        </div>

        {/* ── Mission card ── */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="mt-10 sm:mt-16 rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#FFFFFF] shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]"
        >
          <div className="flex flex-col gap-6 items-center">
            <div
              data-aos="fade-down"
              data-aos-delay="200"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]"
            >
              <i className="fa-solid fa-book-open text-3xl sm:text-4xl text-[#D4A574]"></i>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="250"
              className="text-center w-full sm:w-3/4 lg:w-162.5"
            >
              <h2 className="text-xl sm:text-2xl text-[#6B5744]">
                Our Mission
              </h2>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#A0907D] mt-4">
                BookNest was created to make reading accessible and enjoyable
                for everyone. Whether you're discovering new stories, improving
                your language skills, or sharing the joy of reading with
                children, we provide a thoughtful, distraction-free space where
                books come to life.
              </p>
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 lg:mt-16">
          {/* Card 1 */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center">
              <i className="fa-solid fa-swatchbook text-3xl sm:text-4xl text-[#6B9AFF]"></i>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
              Discover Books
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
              Browse curated collections across all genres
            </p>
          </div>

          {/* Card 2 */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center">
              <i className="fa-solid fa-language text-3xl sm:text-4xl text-[#6B9AFF]"></i>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
              Improve Your Language
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
              Learn with structured reading levels
            </p>
          </div>

          {/* Card 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#FFE5F0] to-[#FFF0F8] flex justify-center items-center">
              <i className="fa-regular fa-star text-3xl sm:text-4xl text-[#FF6B9D]"></i>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#6B5744] mt-3">
              Enjoy Kids Stories
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#A0907D]">
              Safe, colorful reading for young learners
            </p>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="bg-gradient-to-b from-[#D4A574] to-[#B8915F] mt-10 sm:mt-16 rounded-3xl shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A] p-6 sm:p-8 text-center"
        >
          <h3
            data-aos="fade-down"
            data-aos-delay="200"
            className="text-xl sm:text-2xl text-[#FFFFFF]"
          >
            Ready to start reading?
          </h3>
          <button
            data-aos="fade-up"
            data-aos-delay="300"
            onClick={() => navigate("/home")}
            className="rounded-2xl bg-[#FFFFFF] px-6 py-3 text-sm text-[#D4A574] mt-4 cursor-pointer"
          >
            Explore Books
          </button>
        </div>

      </div>
    </>
  );
}
