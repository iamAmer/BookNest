// import React from "react";
// import ShareSection from "../SharSections/ShareSection";
// import book1 from '../../../src/assets/imgs/close-book-with-blue-cover 1.png'
// import book2 from '../../../src/assets/imgs/close-book-with-blue-cover 2.png'
// import book3 from '../../../src/assets/imgs/close-book-with-blue-cover 3.png'

// export default function Home() {
//   return (
//     <>
//       <div className="min-h-screen bg-[#FFFFFF]">
//         <div className="max-w-6xl mx-auto px-4 py-8 md:py-8">
//           <div className="text-center mb-24">
//             <h1 className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-4">
//               Discover Your Next Great Read
//             </h1>

//             <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
//               Immerse yourself in a curated collection of stories that inspire,
//               educate, and transport you to new worlds.
//             </p>
//             <button className="bg-[#8B6F47] hover:bg-[#7A5F37] text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-300 inline-flex items-center gap-2 shadow-md">
//               Start Exploring
//               <span className="text-xl">›</span>
//             </button>
//           </div>
//           <div className="relative h-80 md:h-96">
//             <div className="absolute left-0 md:left-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80  z-10 ">
//               <img
//                 src={book3}
//                 alt="Book 2"
//                 className="w-full h-full rounded-sm"
//               />
//               {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/90 via-[#FFFFFF]/40 to-transparent"></div> */}
//             </div>
//             <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 md:-top-20 w-48 md:w-[475px] h-80 md:h-[450px]  z-20">
//               <img
//                 src={book1}
//                 alt="Featured Book"
//                 className="w-full h-full rounded-sm"
//               />
//             </div>
//             <div className="absolute right-0 md:right-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80 z-10 ">
//               <img
//                 src={book2}
//                 alt="Book 3"
//                 className="w-full h-full rounded-sm"
//               />
//               {/* <div className="absolute bottom-048 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/90 via-[#FFFFFF]/40 to-transparent"></div> */}
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 z-40">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-80  mx-auto px-4">
//                 <div className="text-center">
//                   <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">
//                     10k+
//                   </div>
//                   <div className="text-gray-700 font-medium text-lg">
//                     Books Available
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">
//                     1.2k+
//                   </div>
//                   <div className="text-gray-700 font-medium text-lg">
//                     Kids books
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">
//                     50k+
//                   </div>
//                   <div className="text-gray-700 font-medium text-lg">
//                     Active Readers
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/80 via-[#FFFFFF]/40 to-transparent z-30 pointer-events-none"></div>
//           </div>
//         </div>
//       </div>
//         <ShareSection/>
      
//     </>
//   );
// }



import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ShareSection from "../SharSections/ShareSection";
import book1 from '../../../src/assets/imgs/close-book-with-blue-cover 1.png'
import book2 from '../../../src/assets/imgs/close-book-with-blue-cover 2.png'
import book3 from '../../../src/assets/imgs/close-book-with-blue-cover 3.png'

/* ── Keyframe styles ── */
const mountStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bookDropCenter {
    0%   { opacity: 0; transform: translateX(-50%) translateY(-60px) scale(0.92); }
    70%  { opacity: 1; transform: translateX(-50%) translateY(6px)  scale(1.02); }
    100% { opacity: 1; transform: translateX(-50%) translateY(-2rem) scale(1); }
  }
  @keyframes bookDropCenter_mobile {
    0%   { opacity: 0; transform: translateX(-50%) translateY(-60px) scale(0.92); }
    70%  { opacity: 1; transform: translateX(-50%) translateY(6px)  scale(1.02); }
    100% { opacity: 1; transform: translateX(-50%) translateY(-2rem) scale(1); }
  }
  @keyframes bookFadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes bookFadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Hero text items */
  .hero-item {
    opacity: 0;
    animation: fadeSlideUp 0.5s ease-out forwards;
  }
  .hero-item-1 { animation-delay: 0.10s; }
  .hero-item-2 { animation-delay: 0.25s; }
  .hero-item-3 { animation-delay: 0.40s; }

  /* Book images */
  .book-center {
    animation: bookDropCenter 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) 0.45s both;
  }
  .book-left {
    opacity: 0;
    animation: bookFadeLeft 0.55s ease-out 0.70s forwards;
  }
  .book-right {
    opacity: 0;
    animation: bookFadeRight 0.55s ease-out 0.70s forwards;
  }

  /* Stats */
  .stat-item {
    opacity: 0;
    animation: fadeSlideUp 0.45s ease-out forwards;
  }
  .stat-item-1 { animation-delay: 0.90s; }
  .stat-item-2 { animation-delay: 1.02s; }
  .stat-item-3 { animation-delay: 1.14s; }
`;

export default function Home() {

  /* Init AOS once — used by ShareSection children */
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
      <style>{mountStyles}</style>

      <div className="min-h-screen bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-8">

          {/* ── Hero text ── */}
          <div className="text-center mb-24">
            <h1 className="hero-item hero-item-1 text-4xl md:text-5xl font-bold text-[#8B6F47] mb-4">
              Discover Your Next Great Read
            </h1>

            <p className="hero-item hero-item-2 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Immerse yourself in a curated collection of stories that inspire,
              educate, and transport you to new worlds.
            </p>

            <button className="hero-item hero-item-3 bg-[#8B6F47] hover:bg-[#7A5F37] text-white px-8 py-3 mb-14 rounded-lg font-medium text-lg transition-colors duration-300 inline-flex items-center gap-2 shadow-md">
              Start Exploring
              <span className="text-xl">›</span>
            </button>
          </div>

          {/* ── Books + Stats ── */}
          <div className="relative h-80 md:h-96">

            {/* Book left */}
            <div className="book-left absolute left-0 md:left-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80 z-10">
              <img src={book3} alt="Book 2" className="w-full h-full rounded-sm" />
            </div>

            {/* Book center — keeps its own transform via keyframe */}
            <div className="book-center absolute left-1/2 -top-8 md:-top-20 w-48 md:w-[475px] h-80 md:h-[450px] z-20">
              <img src={book1} alt="Featured Book" className="w-full h-full rounded-sm" />
            </div>

            {/* Book right */}
            <div className="book-right absolute right-0 md:right-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80 z-10">
              <img src={book2} alt="Book 3" className="w-full h-full rounded-sm" />
            </div>

            {/* Stats */}
            <div className="absolute bottom-0 left-0 right-0 z-40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-80 mx-auto px-4">
                <div className="stat-item stat-item-1 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">10k+</div>
                  <div className="text-gray-700 font-medium text-lg">Books Available</div>
                </div>
                <div className="stat-item stat-item-2 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">1.2k+</div>
                  <div className="text-gray-700 font-medium text-lg">Kids books</div>
                </div>
                <div className="stat-item stat-item-3 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2">50k+</div>
                  <div className="text-gray-700 font-medium text-lg">Active Readers</div>
                </div>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/80 via-[#FFFFFF]/40 to-transparent z-30 pointer-events-none"></div>
          </div>

        </div>
      </div>

      {/* ShareSection uses AOS internally — init above covers it */}
      <ShareSection />
    </>
  );
}

