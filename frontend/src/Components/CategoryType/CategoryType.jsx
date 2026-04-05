import React from 'react'
import { useNavigate } from "react-router-dom";

export default function CategoryType() {
  const navigate = useNavigate();
  return <>
    <section className='bg-[#F8F6F3]'>
      <div>
        <button className='text-[#4A3D2F] m-8 cursor-pointer' onClick={()=> navigate('/home/Category')}><i class="fa-solid fa-arrow-left mr-1"></i>Back to Categories</button>
        <div className='overflow-hidden relative bg-gradient-to-b from-[#F5EAD3] via-[#F0E5CE] to-[#EBE0C9] rounded-3xl mx-8 p-14'>
          <div className='flex gap-8 items-center'>
            <div className='w-24 h-24 flex justify-center items-center rounded-2xl border-[0.8px] border-[#FFFFFF80] bg-[#FFFFFFE5] shadow-[0_10px_40px_0_#B89B6B20]'><i class="fa-solid fa-scroll text-[#B89B6B] text-4xl"></i></div>
            <div className=''>
              <h1 className='text-[#4A3D2F] text-[48px]'>History</h1>
              <p className='text-[#726353]'>Journey through time and discover the past</p>
            </div>
          </div>
          <div className='w-38 h-38 rounded-[26843500px] opacity-14 bg-[#B89B6B] absolute top-8 left-250'></div>
          <div className='w-38 h-38 rounded-[26843500px] opacity-18 bg-[#B89B6B] absolute top-12 left-242'></div>
          <div className='w-[135.76px] h-[135.76px] rounded-2xl opacity-12 bg-[#B89B6B] absolute top-[90px] left-[835px] rotate-45'></div>
          <div className='w-22 h-22 rounded-[26843500px] opacity-15 bg-[#B89B6B] absolute top-14 left-266'></div>
          <div className='opacity-5 absolute top-[56px] left-[1048px]'><i class="fa-solid fa-scroll text-[#B89B6B] text-6xl"></i></div>
        </div>
      </div>
      <div className='p-8'>
        <p className='text-[#4A3D2F]'>16 books available</p>
        <div>
          <div>
            <div><img src="" alt="" /></div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  </>
}
