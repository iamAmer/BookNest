import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function GuestProtected() {
    let navigate = useNavigate();
  return <>
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-lg h-[727.2px] flex flex-col justify-center gap-6 text-center'>
            <div className='bg-[#FFFFFF] text-center rounded-3xl border-[0.8px] border-[#E8D4B8] p-[48.8px] flex flex-col items-center shadow-[0_4px_6px_-4px_#0000001A,0_10px_15px_-3px_#0000001A]'>
                <div className='w-20 h-20 bg-[#F8F6F3] rounded-[26843500px] border-[1.6px] border-[#E8D4B8] flex justify-center items-center '><i class="fa-solid fa-book-skull text-4xl text-[#6B5744]"></i></div>
                <h1 className='text-[#331B04] mt-6'>Create an account to continue reading</h1>
                <p className='opacity-75 text-[#54360C] w-102.5 mt-4'>Join BookNest to unlock full access to thousands of books and personalize your reading experience.</p>
                <div className='w-[414.3999938964844px] h-[173.60000610351562px] mt-6 bg-[#F8F6F3] border-[0.8px] border-[#E8D4B8] p-6 rounded-2xl'>
                    <ul className='flex flex-col gap-3'>
                        <li className='flex gap-2'><div className='w-5 h-5 rounded-[26843500px] bg-[#C4A574] flex justify-center items-center'><i class="fa-solid fa-check text-[#FFFFFF] text-[12px]"></i></div><span className='text-[#6B5744] text-[14px]'>Save your reading progress across devices</span></li>
                        <li className='flex gap-2'><div className='w-5 h-5 rounded-[26843500px] bg-[#C4A574] flex justify-center items-center'><i class="fa-solid fa-check text-[#FFFFFF] text-[12px]"></i></div><span className='text-[#6B5744] text-[14px]'>Get personalized book recommendations</span></li>
                        <li className='flex gap-2'><div className='w-5 h-5 rounded-[26843500px] bg-[#C4A574] flex justify-center items-center'><i class="fa-solid fa-check text-[#FFFFFF] text-[12px]"></i></div><span className='text-[#6B5744] text-[14px]'>Access our full library of thousands of books</span></li>
                        <li className='flex gap-2'><div className='w-5 h-5 rounded-[26843500px] bg-[#C4A574] flex justify-center items-center'><i class="fa-solid fa-check text-[#FFFFFF] text-[12px]"></i></div><span className='text-[#6B5744] text-[14px]'>Build your personal reading collection</span></li>
                    </ul>
                </div>
                <div className='flex flex-col  w-full mt-6'>
                    <button onClick={()=> {navigate('/register')}} className='bg-gradient-to-b from-[#6B5744] to-[#8B7355] rounded-[26843500px] cursor-pointer py-2.5 mb-3 text-[#FFFFFF] shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'>Sign Up for Free</button>
                    <button onClick={()=> {navigate('/login')}} className='rounded-[26843500px] border-[1.6px] border-[#6B5744] py-2.5 cursor-pointer'>Log In to Your Account</button>
                </div>
                <button onClick={()=> navigate('/')} className='flex gap-1 justify-center items-center cursor-pointer text-[#6B5744] mt-5'><i class="fa-solid fa-arrow-left"></i>Back to Home</button>
            </div>
            <div className='opacity-60 text-[#6B5744] text-[14px]'><p>Your personal reading sanctuary awaits</p></div>
        </div>
    </div>
  </>
}
