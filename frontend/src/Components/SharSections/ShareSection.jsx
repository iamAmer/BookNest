import React from 'react'
import Slider from "react-slick";
import spotlightImg from '../../../src/assets/imgs/71qsovx-x6L._AC_UL320_.jpg'
import James_Clear from '../../../src/assets/imgs/james-Clear.webp'
import OIP from '../../../src/assets/imgs/OIP.webp'

export default function ShareSection() {
  const settings = {
    dots: false,
    arrows: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return <>
    <div>
      <section className='mt-10 px-20 py-10 bg-[#FFFFFF]'>
        <h1 className='text-center text-[#6B5744] font-semibold text-[40px]'>Why Choose BookNest?</h1>
        <div className='flex mt-5 gap-6'>
          <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#F4E8D7] rounded-xl'>
              <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
              <div className="contentCard">
                <h2 className='text-[#795420] font-medium '>Curated Collection</h2>
                <p className='text-xl'>Handpicked books across all genres for every reade</p>
              </div>
          </div>
          <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#F4E8D7] rounded-xl'>
              <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
              <div className="contentCard">
                <h2 className='text-[#795420] font-medium'>Personalized</h2>
                <p className='text-xl'>Smart recommendations based on your reading taste</p>
              </div>
          </div>
          <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#F4E8D7] rounded-xl'>
              <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
              <div className="contentCard">
                <h2 className='text-[#795420] font-medium '>Ad-Free Reading</h2>
                <p className='text-xl'>Ad-Free Reading</p>
              </div>
          </div>
          <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#F4E8D7] rounded-xl'>
              <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
              <div className="contentCard">
                <h2 className='text-[#795420] font-medium '>Track Progress</h2>
                <p className='text-xl'>Monitor your reading journey and achievements</p>
              </div>
          </div>
        </div>
      </section>
      <section className="mt-24">
        <h2 className="text-center text-[40px] font-semibold text-[#6B5744]">
          Spotlight
        </h2>
        <div className="mt-12 bg-[#F1E1CB] py-10 px-20">
          <div className="flex gap-6.25 w-full">
            <img
              src={spotlightImg}
              alt="The Midnight Library"
              className="rounded-sm shadow-md"
            />
            <div className="flex flex-col gap-6">
              <div className='flex flex-col gap-4'>
                <span className="inline-block bg-[#DFBA86] text-[#795420] 
                px-4 py-1.5 rounded-xl text-sm font-medium border-2 border-[#C99A5E] w-fit">
                  Featured Book of the Week
                </span>
                <div className='flex flex-col gap-2'>
                  <p className="text-[28px] text-[#795420] font-medium">
                    Fiction
                  </p>
                  <h3 className="text-[48px] md:text-4xl font-semibold text-[#795420] leading-tight">
                    The Midnight Library
                  </h3>
                  <p className="text-[28px] text-[#795420]">
                    by Matt Haig
                  </p>
                </div>
                <p className=" text-[20px] text-[#795420] leading-[100%] ">
                  A transformative read that has captured the hearts of thousands.
                  This week's featured selection offers profound insights and
                  captivating storytelling that will stay with you long after the
                  last page.
                </p>
                <div className="flex flex-wrap gap-11 text-sm text-[#795420]">
                  <span>📖 Read Time: 8–10 hrs</span>
                  <span>⭐ Rating: 4.8/5</span>
                </div>
              </div>
              <div className="flex gap-11 flex-wrap">
                <button className="bg-[#795420] text-[#ffffff] px-6 py-3 rounded-xl
                font-semibold shadow-md hover:shadow-lg transition">
                  Start Reading
                </button>

                <button className="px-6 py-3 rounded-xl font-semibold text-[#795420] 
                hover:bg-[#795420] hover:text-[#ffffff] transition">
                  Add to Library
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className='px-8 py-12 flex flex-col gap-12'>
        <div className=''>
          <div className='flex gap-3 items-center mb-6'>
            <div className='w-8 h-8 rounded-xl bg-[#F5E6D3] flex justify-center items-center'><i class="fa-solid fa-arrow-trend-up"></i></div>
            <p>Trending Now</p>
          </div>
          <Slider {...settings}>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
              </div>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
              </div>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
              </div>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
              </div>
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
              </div>
          </Slider>
        </div>
        <div className='flex justify-between'>
          <div className='p-6 rounded-xl w-[386.6750183105469px] bg-[#ffffff] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
            <div className='flex gap-4 items-center'>
              <div className='rounded-[14px] bg-[#F5E6D3] w-12 h-12 flex justify-center items-center'><i class="fa-solid fa-book-open text-[#B8956A]"></i></div>
              <div>
                <p className='text-[#726353] text-[14px]'>Total Books</p>
                <p className='text-[#4A3D2F] text-[16px]'>10,000+</p>
              </div>
            </div>
          </div>
          <div className='p-6 rounded-xl w-[386.6750183105469px] bg-[#ffffff] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
            <div className='flex gap-4 items-center'>
              <div className='rounded-[14px] bg-[#F5E6D3] w-12 h-12 flex justify-center items-center'><i class="fa-regular fa-clock text-[#B8956A]"></i></div>
              <div>
                <p className='text-[#726353] text-[14px]'>Active Readers</p>
                <p className='text-[#4A3D2F] text-[16px]'>5,000+</p>
              </div>
            </div>
          </div>
          <div className='p-6 rounded-xl w-[386.6750183105469px] bg-[#ffffff] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
            <div className='flex gap-4 items-center'>
              <div className='rounded-[14px] bg-[#F5E6D3] w-12 h-12 flex justify-center items-center'><i class="fa-solid fa-bullseye text-[#B8956A]"></i></div>
              <div>
                <p className='text-[#726353] text-[14px]'>Categories</p>
                <p className='text-[#4A3D2F] text-[16px]'>20+ Genres</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='px-20 py-10'>
          <div className='mb-10'>
            <h2 className='text-[#4A3D2F] text-4xl'>Popular Authors</h2>
            <p className='text-[#726353]'>Discover works from bestselling writers</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
                <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
                <p className="my-4 pl-4 font-bold text-gray-500 text-center">James Clear</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Self-Help</p>
                <div className='flex gap-3 justify-center'>
                  <p>3 books</p>
                  <p>.</p>
                  <p>2.5K</p>
                </div>
              </div>
            </div>
          <div className="">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
              <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
              <p className="my-4 pl-4 font-bold text-gray-500 text-center">Napoleon Hill</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Business</p>
              <div className='flex gap-3 justify-center'>
                <p>12 books</p>
                <p>.</p>
                <p>1.8K</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
              <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
              <p className="my-4 pl-4 font-bold text-gray-500 text-center">Robert Kiyosaki</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Finance</p>
              <div className='flex gap-3 justify-center'>
                <p>8 books</p>
                <p>.</p>
                <p>3.2K</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
              <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
              <p className="my-4 pl-4 font-bold text-gray-500 text-center">Brian Tracy</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Motivation</p>
              <div className='flex gap-3 justify-center'>
                <p>15 books</p>
                <p>.</p>
                <p>1.5K</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
              <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
              <p className="my-4 pl-4 font-bold text-gray-500 text-center">Malcolm Gladwell</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">Psychology</p>
              <div className='flex gap-3 justify-center'>
                <p>7 books</p>
                <p>.</p>
                <p>2.1K</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="max-w-xs cursor-pointer rounded-lg bg-white px-5 pt-5 pb-[0.8] shadow duration-150 hover:scale-105 hover:shadow-md">
              <img className="w-full rounded-lg object-cover object-center" src={James_Clear} alt="product" />
              <p className="my-4 pl-4 font-bold text-gray-500 text-center">Yuval Noah Harari</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800 text-center rounded-lg bg-[#F5E6D3] border-2 border-[#00000000]">History</p>
              <div className='flex gap-3 justify-center'>
                <p>4 books</p>
                <p>.</p>
                <p>1.9K</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      <section className='bg-gradient-to-b from-[#F5E6D3] via-white to-[#EFE3CE] py-20 px-10'>
        <div className='px-8'>
          <h2 className='text-[#4A3D2F] text-center text-4xl'>Join Our Reading Community</h2>
          <p className='text-[#726353] text-lg text-center pb-5'>Be part of something bigger</p>
          <div className='flex mt-5 gap-6'>
            <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#FFFFFFE5] rounded-3xl border-1 border-[#E8D4B880] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
                <div className="contentCard">
                  <h2 className='text-[#795420] font-medium '>50K+</h2>
                  <p className='text-xl'>Active Readers</p>
                </div>
            </div>
            <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#FFFFFFE5] rounded-3xl border-1 border-[#E8D4B880] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
                <div className="contentCard">
                  <h2 className='text-[#795420] font-medium'>10,000+</h2>
                  <p className='text-xl'>Books Available</p>
                </div>
            </div>
            <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#FFFFFFE5] rounded-3xl border-1 border-[#E8D4B880] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
                <div className="contentCard">
                  <h2 className='text-[#795420] font-medium '>1M+</h2>
                  <p className='text-xl'>Books Read</p>
                </div>
            </div>
            <div className='w-3/12 text-center p-4 flex flex-col items-center bg-[#FFFFFFE5] rounded-3xl border-1 border-[#E8D4B880] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                <div className='p-2.5 rounded-xl bg-[#795420]'><i className="fa-solid fa-book text-white"></i></div>
                <div className="contentCard">
                  <h2 className='text-[#795420] font-medium '>500+</h2>
                  <p className='text-xl'>Badge Winners</p>
                </div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  </>
}
