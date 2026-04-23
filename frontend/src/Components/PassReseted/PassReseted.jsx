import React from 'react'

export default function PassReseted() {
  return <>
    <div className='bg-[#F8F6F3] '>
      <div className='flex justify-center items-center flex-col h-lvh relative'>
      <div>logo</div>
      <div className='bg-[#FFFFFF] header-font text-[#4A4A4A] rounded-3xl p-10 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
        <div className='flex justify-center mb-4'><div className='w-16 h-16 rounded-full bg-[#F5E6D3] flex justify-center items-center text-[#D4A574]'><i class="fa-solid fa-check"></i></div></div>
        <div className='mb-4'>
          <h3 className='text-[#333333] mb-4 text-center'>Password Reset</h3>
          <p className='text-[#4A4A4A] text-sm max-w-[300px] leading-6'>Your password has been successfully reset</p>
        </div>
          <button type="submit" class="text-[#FFFFFF] bg-[#D4A574] w-full box-border border border-transparent  hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Back to Login</button>
      </div>
      </div>
      <div className=''>
            <div className='absolute top-20 left-20 w-[256px] h-[256px] bg-[#F5E6D3] blur-xl opacity-50 rounded-full'></div>
            <div className='absolute bottom-20 right-20 w-[320px] h-[320px] bg-[#F5E6D3] blur-xl opacity-50 rounded-full'></div>
      </div>
    </div>
  </>
}
