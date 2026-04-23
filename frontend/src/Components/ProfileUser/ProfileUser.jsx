import React, { useContext } from 'react'
import bookLibrary from '../../../src/assets/imgs/trending1.png'
import { UserContext } from '../Context/UserContext'

export default function ProfileUser() {
  const {userData} = useContext(UserContext);
  return <>
    <div className='bg-[#F8F6F3]'>
      <div className='bg-linear-to-r from-[#F5E6D3] to-[#E8D4B8] px-8 py-12 relative'>
        <div className=''>
          <div className='flex justify-center items-center flex-col'>
            <div className='flex flex-col justify-center items-center relative w-fit'>
              <div className='w-32 h-32 bg-[#C4A574] rounded-[26843500px] p-1 border-4 border-[#FFFFFF] flex justify-center items-center'><i className="fa-regular fa-user text-[#FFFFFF]"></i></div>
              <div className='w-10 h-10 bg-[#C4A574] rounded-[26843500px] border-4 border-[#FFFFFF] flex justify-center items-center absolute top-24 left-24'><i class="fa-solid fa-book-open text-[#FFFFFF]"></i></div>
            </div>
            <h1 className='mt-4 text-[#6B5744]'>{userData?.name}</h1>
            <div className='flex gap-4 mt-2 text-[#8B7355]'>
              <div className=''><i class="fa-regular fa-envelope"></i> {userData?.email}</div>
              <div><i class="fa-regular fa-calendar"></i> Joined Nov 2024</div>
            </div>
          </div>
          <div className='w-[320px] h-80 rounded-[26843500px] bg-[#D4A5741A] blur-[128px] absolute left-0 top-6'></div>
          <div className='w-87 h-87 rounded-[26843500px] bg-[#FFFFFF33] blur-[128px] absolute left-222'></div>
        </div>
    </div>
    <div className='px-8 flex flex-col gap-12'>
      <div className=' grid grid-rows-1 grid-cols-2 gap-y-4 gap-x-4'>
        <div className='rounded-2xl p-6 flex flex-col justify-center items-center bg-[#FFFFFF] shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'>
          <div className='w-12 h-12 mb-3 rounded-2xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center'><i class="fa-solid fa-book-open text-[#D4A574]"></i></div>
          <p className='text-[#A0907D]'>Books Read</p>
          <p className='text-[#6B5744]'>24</p>
        </div>
        <div className='rounded-2xl p-6 flex flex-col justify-center items-center bg-[#FFFFFF] shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'>
          <div className='w-12 h-12 mb-3 rounded-2xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center'><i class="fa-solid fa-bullseye text-[#D4A574]"></i></div>
          <p className='text-[#A0907D]'>2024 Goal</p>
          <p className='text-[#6B5744]'>24/50</p>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className='text-[#6B5744] text-[20px]'>Reading Activity</h2>
        <div className='p-6 w-full rounded-2xl bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'><span className='text-[#8B7355]'>This Week</span><span className='text-[#6B5744]'>8.5 hours</span></div>
            <div className="w-full bg-[#F5E6D3] rounded-full h-2">
              <div className="bg-[#D4A574] h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between'>
          <h2 className='text-[#6B5744] text-[20px]'>My Library</h2>
          <span className='text-[#A0907D]'>6 books</span>
        </div>
        <div>
          <div className='p-3 rounded-2xl w-[181.3249969482422px] h-[376] flex flex-col gap-1 bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
            <div><img className='w-full h-full rounded-[14px]' src={bookLibrary} alt="" /></div>
            <div>
              <h3 className='text-[#4A3D2F]'>The Midnight Library</h3>
              <p className='text-[#726353]'>Matt Haig</p>
              <div className='flex gap-1 items-center'><i class="fa-solid fa-star text-[#D4A574]"></i><span className='text-[#5D4E3E]'>4.8</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
}
