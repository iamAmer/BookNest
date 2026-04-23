import React from "react";
import ShareSection from "../SharSections/ShareSection";
import book1 from '../../../src/assets/imgs/close-book-with-blue-cover 1.png'
import book2 from '../../../src/assets/imgs/close-book-with-blue-cover 2.png'
import book3 from '../../../src/assets/imgs/close-book-with-blue-cover 3.png'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#FFFFFF] font-sans">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-8">
          <div className="text-center mb-24">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-4 font-serif">
              Discover Your Next Great Read
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Immerse yourself in a curated collection of stories that inspire,
              educate, and transport you to new worlds.
            </p>
            <button className="bg-[#8B6F47] hover:bg-[#7A5F37] text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-300 inline-flex items-center gap-2 shadow-md">
              Start Exploring
              <span className="text-xl">›</span>
            </button>
          </div>
          <div className="relative h-80 md:h-96">
            <div className="absolute left-0 md:left-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80  z-10 ">
              <img
                src={book3}
                alt="Book 2"
                className="w-full h-full rounded-sm"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/90 via-[#FFFFFF]/40 to-transparent"></div> */}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 md:-top-20 w-48 md:w-[475px] h-80 md:h-[450px]  z-20">
              <img
                src={book1}
                alt="Featured Book"
                className="w-full h-full rounded-sm"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/95 via-[#FFFFFF]/70 via-[#FFFFFF]/40 to-transparent"></div> */}
            </div>
            <div className="absolute right-0 md:right-[8%] top-0 w-48 md:w-[475px] h-64 md:h-80 z-10 ">
              <img
                src={book2}
                alt="Book 3"
                className="w-full h-full rounded-sm"
              />
              {/* <div className="absolute bottom-048 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/90 via-[#FFFFFF]/40 to-transparent"></div> */}
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-80  mx-auto px-4">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
                    10k+
                  </div>
                  <div className="text-gray-700 font-medium text-lg">
                    Books Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
                    1.2k+
                  </div>
                  <div className="text-gray-700 font-medium text-lg">
                    Kids books
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
                    50k+
                  </div>
                  <div className="text-gray-700 font-medium text-lg">
                    Active Readers
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/80 via-[#FFFFFF]/40 to-transparent z-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
        <ShareSection/>
      
    </>
  );
}

// import React from "react";
// import ShareSection from "../SharSections/ShareSection";
// import book2 from "../../../src/assets/imgs/c-quote1768882686.jpg";

// export default function Home() {
//   return (
//     <>
//       <div className="min-h-screen bg-[#FFFFFF] font-sans">
//         <div className="max-w-6xl mx-auto px-4 py-8 md:py-8">

//           {/* Hero Text */}
//           <div className="text-center mb-24">
//             <h1 className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-4 font-serif">
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

//           {/* Books Section */}
//           <div className="relative h-80 md:h-[500px]">

//             {/* Left Book */}
//             <div className="absolute left-0 md:left-[5%] top-0 w-48 md:w-[475px] z-10">
//               <img
//                 src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
//                 alt="Book 1"
//                 className="w-full h-full rounded-r-lg"
//               />
//             </div>

//             {/* Center Book */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 md:-top-16 w-48 md:w-[475px] z-20">
//               <img
//                 src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=80"
//                 alt="Featured Book"
//                 className="w-full h-full rounded-lg"
//               />
//             </div>

//             {/* Right Book */}
//             <div className="absolute right-0 md:right-[5%] top-0 w-48 md:w-[475px] z-10">
//               <img
//                 src={book2}
//                 alt="Book 3"
//                 className="w-full h-full rounded-l-lg"
//               />
//             </div>

//           </div>

//         </div>

//         {/* Stats Section (بتغطي الكتب) */}
//         <div className="relative z-30 bg-white -mt-20 md:-mt-28 pt-12 pb-16">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-40 max-w-6xl mx-auto px-4">

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 10k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Books Available
//               </div>
//             </div>

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 1.2k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Kids books
//               </div>
//             </div>

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 50k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Active Readers
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>

//       <ShareSection />
//     </>
//   );
// }


// import React from "react";
// import ShareSection from "../SharSections/ShareSection";
// import book2 from "../../../src/assets/imgs/c-quote1768882686.jpg";
// import book3 from "../../../src/assets/imgs/close-book-with-blue-cover 1.png";

// export default function Home() {
//   return (
//     <>
//       <div className="min-h-screen bg-white font-sans">

//         <div className="max-w-6xl mx-auto px-4 py-8">

//           {/* Hero Text */}
//           <div className="text-center mb-20">
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
//           <div className="relative h-[260px] md:h-[380px]">
//             <div className="absolute left-0 md:left-[5%] top-0 w-40 md:w-[420px] z-10">
//               <img
//                 src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
//                 alt="Book 1"
//                 className="w-full h-full rounded-r-lg"
//               />
//             </div>
//             <div className="absolute left-1/2 -translate-x-1/2 -top-8 md:-top-12 w-44 md:w-[450px] z-20">
//               <img
//                 src={book3}
//                 alt="Featured Book"
//                 className="w-full h-full rounded-lg"
//               />
//             </div>
//             <div className="absolute right-0 md:right-[5%] top-0 w-40 md:w-[420px] z-10">
//               <img
//                 src={book2}
//                 alt="Book 3"
//                 className="w-full h-full rounded-l-lg"
//               />
//             </div>

//           </div>
//         </div>
//         <div className="relative z-30 bg-white -mt-10 md:-mt-14 pt-10 pb-14 w-full">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-32 max-w-6xl mx-auto px-4">

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 10k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Books Available
//               </div>
//             </div>

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 1.2k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Kids books
//               </div>
//             </div>

//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-[#8B6F47] mb-2 font-serif">
//                 50k+
//               </div>
//               <div className="text-gray-700 font-medium text-lg">
//                 Active Readers
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//       <section className="relative z-30 bg-white -mt-10 md:-mt-14 pt-10 pb-14">
//       <ShareSection />
//       </section>
//     </>
//   );
// }




