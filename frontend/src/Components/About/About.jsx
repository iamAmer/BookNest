import React from 'react'

export default function About() {
  return <>
    <div className='bg-[#F8F6F3] px-39 py-32'>
      <div className='text-center px-45'>
        <h1 className='text-[60px] text-[#6B5744] font-normal '>About BookNest</h1>
        <p className='text-[20px] text-[#A0907D]'>A warm, welcoming platform for discovering, reading, and exploring books for everyone.</p>
      </div>
      <div className='mt-16 rounded-3xl p-12 bg-[#FFFFFF] shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]'>
        <div className='flex flex-col gap-6 items-center'>
          <div className='w-20 h-20 rounded-3xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'><i class="fa-solid fa-book-open text-4xl text-[#D4A574]"></i></div>
          <div className='text-center w-162.5'>
            <h2 className='text-2xl text-[#6B5744]'>Our Mission</h2>
            <p className='text-[18px] text-[#A0907D] mt-4'>BookNest was created to make reading accessible and enjoyable for everyone. Whether you're discovering new stories, improving your language skills, or sharing the joy of reading with children, we provide a thoughtful, distraction-free space where books come to life.</p>
          </div>
        </div>
      </div>
      <div className='flex gap-6 mt-16'>
        <div className='p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center'><i class="fa-solid fa-swatchbook text-4xl text-[#6B9AFF]"></i></div>
          <h3 className='text-[20px] text-[#6B5744]'>Discover Books</h3>
          <p className='text-[16px] text-[#A0907D]'>Browse curated collections across all genres</p>
        </div>
        <div className='p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-b from-[#E8F5E9] to-[#D4EED8] flex justify-center items-center'><i class="fa-solid fa-language text-4xl text-[#6B9AFF]"></i></div>
          <h3 className='text-[20px] text-[#6B5744]'>Improve Your Language</h3>
          <p className='text-[16px] text-[#A0907D]'>Learn with structured reading levels</p>
        </div>
        <div className='p-8 bg-[#FFFFFF] rounded-3xl text-center shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A] flex flex-col items-center'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FFE5F0] to-[#FFF0F8] flex justify-center items-center'><i class="fa-regular fa-star text-4xl text-[#FF6B9D]"></i></div>
          <h3 className='text-[20px] text-[#6B5744]'>Enjoy Kids Stories</h3>
          <p className='text-[16px] text-[#A0907D]'>Safe, colorful reading for young learners</p>
        </div>
      </div>
      <div className='bg-gradient-to-b from-[#D4A574] to-[#B8915F] mt-16 rounded-3xl shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A] p-8 text-center'>
        <h3 className='text-2xl text-[#FFFFFF]'>Ready to start reading?</h3>
        <button className='rounded-2xl bg-[#FFFFFF] px-6 py-3 text-sm text-[#D4A574] mt-4 cursor-pointer'>Explore Books</button>
      </div>
    </div>
  </>
}
