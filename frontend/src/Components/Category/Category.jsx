import React from 'react'
import fictionImage from '../../../src/assets/imgs/trending1.png'
import { useNavigate } from "react-router-dom";

export default function GuestCategory() {
  const navigate = useNavigate();
 return <>
    <section>
      <div className='py-40 bg-gradient-to-br from-[#F8F6F3] via-[#F5E6D34D] to-[#F8F6F3] p-8 flex'>
        <div className='flex justify-between items-center w-full'>
          <div>
            <div className='bg-[#FFFFFFCC] border-[0.8px] px-4 py-2 border-[#E8D4B880] rounded-[26843500px] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A] flex justify-center items-center w-fit'>
              <div className='w-2 h-2 rounded-[26843500px] opacity-95 bg-[#B8956A] mr-1.5'></div>
              <div><p className='text-[#5D4E3E] relative top-[1.5px]'>Browse All Genres</p></div>
            </div>
            <div className='mt-6'>
              <h1 className='lead-[60px] text-[#4A3D2F] text-6xl'>Explore <span className='text-[#B8956A]'>Categories</span></h1>
              <p className='text-[#5D4E3E] text-xl leading-[32.5px] w-122.5 mt-4'>Discover your next great read from our carefully curated collection of genres and topics.</p>
            </div>
            <div className='flex gap-6 mt-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-2xl bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A] flex justify-center items-center'><i className="fa-solid fa-book-bookmark text-[#B8956A]"></i></div>
                <div>
                  <p>12+</p>
                  <p>Categories</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-2xl bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A] flex justify-center items-center'><i className="fa-solid fa-lines-leaning text-[#B8956A]"></i></div>
                <div>
                  <p>1000+</p>
                  <p>Books</p>
                </div>
              </div>
            </div>
          </div>
          <div className='relative px-30'>
            <div className='w-80 h-80 rounded-[26843500px] bg-gradient-to-br from-[#FFFFFF] to-[#F5E6D380] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]'></div>
            <div className='opacity-[54.33%] absolute top-[240px] left-[145px]'><i class="fa-regular fa-bookmark text-[#C4A57480]"></i></div>
            <div className='absolute left-[366.68px] top-8'><i class="fa-regular fa-bookmark text-[#C4A57480]"></i></div>
            <div>
              <div className='absolute top-[80px] left-[226px] left-25'>
                <div className='relative bg-gradient-to-br from-[#F5E6D380] via-[#00000020] to-[#ffffff60] w-32 h-40 rounded-2xl flex justify-center flex-col items-center gap-3 shadow-[0_25px_50px_-12px_#00000040]'>
                  <div className='w-16 h-16 bg-gradient-to-b from-[#B8956A] to-[#A0907D] rounded-2xl flex justify-center items-center shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]'><i class="fa-solid fa-book-open text-[#FFFFFF]"></i></div>
                  <div className='w-12 h-1 bg-[#E8D4B8] rounded-[26843500px]'></div>
                  <div className='w-8 h-1 bg-[#E8D4B8] rounded-[26843500px]'></div>
                  <div className='w-8 h-8 rounded-[26843500px] absolute top-[-12px] left-27 bg-[#B8956A] flex justify-center items-center'><i class="fa-regular fa-bookmark text-[#FFFFFF]"></i></div>
                </div>
                <div></div>
              </div>
              <div className='w-31.5 h-38.5  bg-gradient-to-b from-[#A0907D] to-[#8B7355] rounded-[14px] rotate-[12deg] absolute top-[55.42px] left-[395.56px]'>
                <div className='w-27.75 h-3 absolute top-[32px] left-[15px] bg-[#FFFFFF33]'></div>
                <div className='w-27.75 h-3 absolute top-[16px] left-[15px] bg-[#FFFFFF33]'></div>
              </div>
              <div className='w-31.5 h-38.5  bg-gradient-to-b from-[#B8956A] to-[#A0907D] rounded-[14px] rotate-[6deg] absolute top-[122.54px] left-[380.59px]'>
                <div className='w-27.75 h-3 absolute top-[32px] left-[15px] bg-[#FFFFFF33]'></div>
                <div className='w-27.75 h-3 absolute top-[16px] left-[15px] bg-[#FFFFFF33]'></div>
              </div>
              <div className='w-31.5 h-38.5  bg-gradient-to-b from-[#C4A574] to-[#B8956A] rounded-[14px] rotate-[-6deg] absolute top-[14.63px] left-[35.64px]'>
                <div className='w-27.75 h-3 absolute top-[32px] left-[15px] bg-[#FFFFFF33]'></div>
                <div className='w-27.75 h-3 absolute top-[16px] left-[15px] bg-[#FFFFFF33]'></div>
              </div>
              <div className='w-31.5 h-38.5 flex justify-center items-center  bg-gradient-to-b from-[#E8D4B8] to-[#C4A574] rounded-[14px] rotate-[-6deg] absolute top-[77.32px] left-[72.78px]'>
                <div className='w-27.75 h-3 absolute top-[32px] left-[15px] bg-[#FFFFFF33]'></div>
                <div className='w-27.75 h-3 absolute top-[16px] left-[15px] bg-[#FFFFFF33]'></div>
                <div className=''><i class="fa-regular fa-bookmark text-[#ffffff] text-3xl"></i></div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className='bg-[#F8F6F3] p-8' onClick={()=> navigate('/home/CategoryType')}>
        <div className="w-[280px] bg-[#ffffff] rounded-3xl overflow-hidden relative shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]">
          <div className="relative h-[220px]">
            <img
              src={fictionImage}
              alt="Fiction"
              className="w-full h-full object-cover"
            />
            <div className="w-12 h-12 rounded-[14px] bg-white absolute top-4 left-4 flex justify-center items-center shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]">
              <i className="fa-solid fa-book-open text-[#B8956A] text-lg"></i>
            </div>
          </div>
          <div className="py-6 flex flex-col items-center justify-center">
            <h3 className="text-[18px] font-medium text-[#2B2B2B]">
              Fiction
            </h3>
            <p className="text-[14px] text-[#6B6B6B] mt-1">
              156 books
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
}
