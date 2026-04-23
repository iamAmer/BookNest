import React, { useContext } from 'react'
import bookLibrary from '../../../src/assets/imgs/trending1.png'
import { UserContext } from '../Context/UserContext'
import { useState, useRef, useEffect } from 'react';

export default function ProfileUser() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
  const saved = localStorage.getItem('profileImage');
  if (saved) setProfileImage(saved);
}, []);

 const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      localStorage.setItem('profileImage', base64);
      setProfileImage(base64);
      window.dispatchEvent(new Event('profileImageUpdated'));
    };

    reader.readAsDataURL(file);
  }
};
 

  const {userData} = useContext(UserContext);
  return <>
    <div className='bg-[#F8F6F3]'>

  {/* Hero Banner */}
  <div className='bg-linear-to-r from-[#F5E6D3] to-[#E8D4B8] px-4 sm:px-8 py-10 sm:py-12 relative overflow-hidden'>
    <div className='flex justify-center items-center flex-col'>

     
{/* Avatar */}
<div className='flex flex-col justify-center items-center relative w-fit'>

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleImageChange}
    className="hidden"
  />

  {/* Avatar circle */}
  <div className='w-24 h-24 sm:w-32 sm:h-32 bg-[#C4A574] rounded-[26843500px] p-1 border-4 border-[#FFFFFF] flex justify-center items-center overflow-hidden'>
    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <i className="fa-regular fa-user text-[#FFFFFF] text-2xl sm:text-3xl"></i>
    )}
  </div>

  {/* Upload button */}
  <button
    onClick={() => fileInputRef.current.click()}
    className='w-8 h-8 sm:w-10 sm:h-10 bg-[#C4A574] hover:bg-[#B8915F] transition-colors rounded-[26843500px] border-4 border-[#FFFFFF] flex justify-center items-center absolute top-16 left-16 sm:top-24 sm:left-24 cursor-pointer'
    title="Change profile photo"
  >
    <i className="fa-solid fa-camera text-[#FFFFFF] text-xs sm:text-sm"></i>
  </button>

</div>

      {/* Name */}
      <h1 className='mt-4 text-[#6B5744] text-lg sm:text-xl font-semibold text-center break-all'>
        {userData?.email?.split('@')[0]}
      </h1>

      {/* Meta info */}
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-[#8B7355] text-sm text-center items-center'>
        <div className='truncate max-w-[260px] sm:max-w-none'>
          <i className="fa-regular fa-envelope mr-1"></i>{userData?.email}
        </div>
        <div>
          <i className="fa-regular fa-calendar mr-1"></i>Joined Nov 2024
        </div>
      </div>
    </div>

    {/* Decorative blurs */}
    <div className='w-[200px] sm:w-[320px] h-80 rounded-[26843500px] bg-[#D4A5741A] blur-[128px] absolute left-0 top-6 pointer-events-none'></div>
    <div className='w-64 sm:w-87 h-64 sm:h-87 rounded-[26843500px] bg-[#FFFFFF33] blur-[128px] absolute right-0 top-0 pointer-events-none'></div>
  </div>

  {/* Main Content */}
  <div className='px-4 sm:px-8 flex flex-col gap-8 sm:gap-12 py-6 sm:py-8'>

    {/* Stats Cards */}
    <div className='grid grid-cols-2 gap-4'>
      <div className='rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center bg-[#FFFFFF] shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 mb-3 rounded-2xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center'>
          <i className="fa-solid fa-book-open text-[#D4A574]"></i>
        </div>
        <p className='text-[#A0907D] text-xs sm:text-sm'>Books Read</p>
        <p className='text-[#6B5744] text-lg sm:text-xl font-semibold'>24</p>
      </div>
      <div className='rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center bg-[#FFFFFF] shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 mb-3 rounded-2xl bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] flex justify-center items-center'>
          <i className="fa-solid fa-bullseye text-[#D4A574]"></i>
        </div>
        <p className='text-[#A0907D] text-xs sm:text-sm'>2024 Goal</p>
        <p className='text-[#6B5744] text-lg sm:text-xl font-semibold'>24/50</p>
      </div>
    </div>

    {/* Reading Activity */}
    <div className='flex flex-col gap-4 sm:gap-6'>
      <h2 className='text-[#6B5744] text-[18px] sm:text-[20px]'>Reading Activity</h2>
      <div className='p-4 sm:p-6 w-full rounded-2xl bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between text-sm sm:text-base'>
            <span className='text-[#8B7355]'>This Week</span>
            <span className='text-[#6B5744]'>8.5 hours</span>
          </div>
          <div className="w-full bg-[#F5E6D3] rounded-full h-2">
            <div className="bg-[#D4A574] h-2 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>
      </div>
    </div>

    {/* My Library */}
    <div className='flex flex-col gap-4 sm:gap-6 pb-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-[#6B5744] text-[18px] sm:text-[20px]'>My Library</h2>
        <span className='text-[#A0907D] text-sm'>6 books</span>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        <div className='p-3 rounded-2xl flex flex-col gap-2 bg-[#FFFFFF] shadow-[0_1px_2px_-1px_#0000001A,0_1px_3px_0_#0000001A]'>
          <div>
            <img className='w-full h-40 sm:h-52 object-cover rounded-[14px]' src={bookLibrary} alt="" />
          </div>
          <div>
            <h3 className='text-[#4A3D2F] text-sm sm:text-base font-medium leading-tight'>The Midnight Library</h3>
            <p className='text-[#726353] text-xs sm:text-sm'>Matt Haig</p>
            <div className='flex gap-1 items-center mt-1'>
              <i className="fa-solid fa-star text-[#D4A574] text-xs"></i>
              <span className='text-[#5D4E3E] text-xs sm:text-sm'>4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  </>
}
