// import React, { useContext, useState } from 'react'
// import registerImge from '../../../src/assets/imgs/photo_2026-02-11_13-29-50.jpg'
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../Context/UserContext.jsx';
// import Logo from '../Logo/Logo.jsx';

// export default function Register() {
//   let [apiError, setApiError] = useState(null);
//   let [loading, setLoading] = useState(false);
//   let {setUserToken} = useContext(UserContext);
//   let {setUserData} = useContext(UserContext);
//   let navigate = useNavigate();

//   async function register(values){
//     try{
//       setLoading(true);
//       let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
//       localStorage.setItem("userToken", data.token)
//       setUserData(data.user);
//       setUserToken(data.token);
//       navigate('/home')
//     }catch(err){
//       console.log(err.response.data.message);
//       setApiError(err.response.data.message);
//       setLoading(false);
//     }
//   }

//   let validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters")
//       .max(30, "Name must be less than 30 characters")
//       .required("Full name is required"),

//     email: Yup.string()
//       .email("Enter a valid email address")
//       .required("Email is required"),

//     password: Yup.string()
//       .matches(
//         /^[A-Z][a-z0-9@#$%^&*!]{7,}$/,
//         "Password must start with a capital letter and be at least 8 characters"
//       )
//       .required("Password is required"),

//     rePassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Please confirm your password"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name:'',
//       email:'',
//       password:'',
//       rePassword:'',
//     },validationSchema
//     ,onSubmit: register
//   })
//   return <>
//    <div className='min-h-screen bg-[#EDE0CF] flex items-center justify-center p-4 sm:p-6'>
//   <div className='flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl'>

//     {/* Left Panel - hidden on mobile */}
//     <div className='hidden md:flex bg-[#DBBE9E] p-8 lg:p-10 text-center w-full md:w-[45%] lg:w-[50%] flex-col items-center justify-center'>
//       <div className='mb-4 w-10 h-10 rounded-xl flex items-center justify-center'>
//         <Logo />
//       </div>
//       <h2 className='text-[16px] lg:text-[18px] font-semibold text-[#333333] mb-2'>Join BookNest</h2>
//       <p className='text-[11px] lg:text-[12px] leading-5 text-[#5A4A3A] mb-6 opacity-80'>
//         Start your reading journey today and build your personal library.
//       </p>
//       <div className='w-full'>
//         <img className='w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-90' src={registerImge} alt="BookNest" />
//       </div>
//     </div>

//     {/* Right Panel */}
//     <div className='bg-[#FDFAF7] p-6 sm:p-8 lg:p-10 w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center'>

//       {/* Logo shown only on mobile (since left panel is hidden) */}
//       <div className='flex md:hidden justify-center mb-4'>
//         <div className='w-10 h-10 rounded-xl flex items-center justify-center'>
//           <Logo />
//         </div>
//       </div>

//       <h2 className='text-[18px] sm:text-[20px] font-semibold text-[#333333] mb-1'>Create Account</h2>
//       <p className='text-[12px] sm:text-[13px] text-[#6B6B6B] mb-5 sm:mb-6'>Sign up to get started with BookNest</p>

//       <form className='flex flex-col gap-3 sm:gap-4' onSubmit={formik.handleSubmit}>
//         {apiError && formik.touched.name && (
//           <div className="p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
//             {apiError}
//           </div>
//         )}

//         <div>
//           <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Full Name</label>
//           <input
//             type='text'
//             id='name'
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
//             placeholder='Enter your full name'
//           />
//         </div>
//         {formik.errors.name && formik.touched.name && (
//           <div className="p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
//             {formik.errors.name}
//           </div>
//         )}

//         <div>
//           <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Email Address</label>
//           <input
//             type='email'
//             id='email'
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
//             placeholder='Enter your email'
//           />
//         </div>
//         {formik.errors.email && formik.touched.email && (
//           <div className="p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
//             {formik.errors.email}
//           </div>
//         )}

//         <div>
//           <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Password</label>
//           <input
//             type='password'
//             id="password"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
//             placeholder='Create a password'
//           />
//         </div>
//         {formik.errors.password && formik.touched.password && (
//           <div className="p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
//             {formik.errors.password}
//           </div>
//         )}

//         <div>
//           <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Confirm Password</label>
//           <input
//             type='password'
//             id='rePassword'
//             name="rePassword"
//             value={formik.values.rePassword}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
//             placeholder='Confirm your password'
//           />
//         </div>
//         {formik.errors.rePassword && formik.touched.rePassword && (
//           <div className="p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
//             {formik.errors.rePassword}
//           </div>
//         )}

//         {loading ? (
//           <button type="submit" className="text-white bg-[#D4A574] w-full box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-[14px] text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
//             <i className='fas fa-spinner fa-spin'></i>
//           </button>
//         ) : (
//           <button type="submit" className="text-white bg-[#D4A574] w-full box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-[14px] text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
//             Create Account
//           </button>
//         )}

//         <p className='text-xs text-[#4A4A4A] text-center mt-3 sm:mt-4'>
//           Already have an account?{' '}
//           <button onClick={() => navigate('/login')} className='text-[#D4A574] font-medium hover:underline'>
//             Login
//           </button>
//         </p>
//       </form>
//     </div>

//   </div>
// </div>
//   </>
// }




import React, { useContext, useState } from 'react'
import registerImge from '../../../src/assets/imgs/photo_2026-02-11_13-29-50.jpg'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';
import Logo from '../Logo/Logo.jsx';

/* ── Keyframe styles injected once ── */
const mountStyles = `
  @keyframes cardPop {
    0%   { opacity: 0; transform: scale(0.85) translateY(24px); }
    60%  { opacity: 1; transform: scale(1.02) translateY(-4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .anim-card {
    animation: cardPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .anim-item {
    opacity: 0;
    animation: fadeSlideUp 0.45s ease-out forwards;
  }
  .anim-item:nth-child(1)  { animation-delay: 0.30s; }
  .anim-item:nth-child(2)  { animation-delay: 0.38s; }
  .anim-item:nth-child(3)  { animation-delay: 0.44s; }
  .anim-item:nth-child(4)  { animation-delay: 0.50s; }
  .anim-item:nth-child(5)  { animation-delay: 0.56s; }
  .anim-item:nth-child(6)  { animation-delay: 0.62s; }
  .anim-item:nth-child(7)  { animation-delay: 0.68s; }
  .anim-item:nth-child(8)  { animation-delay: 0.74s; }
  .anim-item:nth-child(9)  { animation-delay: 0.80s; }
  .anim-item:nth-child(10) { animation-delay: 0.86s; }
`;

export default function Register() {
  let [apiError, setApiError] = useState(null);
  let [loading, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  let { setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
        full_name: values.name,
      });
      localStorage.setItem("userToken", data.data.tokens.accessToken);
      setUserData(data.data.user);
      setUserToken(data.data.tokens.accessToken);
      navigate('/home');
    } catch (err) {
      console.log(err.response?.data?.error || err.response?.data?.message);
      setApiError(err.response?.data?.error || err.response?.data?.message);
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be less than 30 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9@#$%^&*!]{7,}$/,
        "Password must start with a capital letter and be at least 8 characters"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '' },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      {/* Inject keyframes once */}
      <style>{mountStyles}</style>

      <div className='min-h-screen bg-[#EDE0CF] flex items-center justify-center p-4 sm:p-6'>

        {/* ── Card: emerges from center on mount ── */}
        <div className='anim-card flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl'>

          {/* ── Left Panel ── */}
          <div className='hidden md:flex bg-[#DBBE9E] p-8 lg:p-10 text-center w-full md:w-[45%] lg:w-[50%] flex-col items-center justify-center'>
            <div className='mb-4 w-10 h-10 rounded-xl flex items-center justify-center'>
              <Logo />
            </div>
            <h2 className='text-[16px] lg:text-[18px] font-semibold text-[#333333] mb-2'>Join BookNest</h2>
            <p className='text-[11px] lg:text-[12px] leading-5 text-[#5A4A3A] mb-6 opacity-80'>
              Start your reading journey today and build your personal library.
            </p>
            <div className='w-full'>
              <img className='w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-90' src={registerImge} alt="BookNest" />
            </div>
          </div>

          {/* ── Right Panel: staggered inner elements ── */}
          <div className='bg-[#FDFAF7] p-6 sm:p-8 lg:p-10 w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center'>

            {/* Mobile logo */}
            <div className='anim-item flex md:hidden justify-center mb-4'>
              <div className='w-10 h-10 rounded-xl flex items-center justify-center'>
                <Logo />
              </div>
            </div>

            <h2 className='anim-item text-[18px] sm:text-[20px] font-semibold text-[#333333] mb-1'>Create Account</h2>
            <p className='anim-item text-[12px] sm:text-[13px] text-[#6B6B6B] mb-5 sm:mb-6'>Sign up to get started with BookNest</p>

            <form className='flex flex-col gap-3 sm:gap-4' onSubmit={formik.handleSubmit}>
              {apiError && formik.touched.name && (
                <div className="anim-item p-3 sm:p-4 mb-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
                  {apiError}
                </div>
              )}

              {/* Full Name */}
              <div className='anim-item'>
                <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
                  placeholder='Enter your full name'
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="mt-1 p-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className='anim-item'>
                <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Email Address</label>
                <input
                  type='email'
                  id='email'
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
                  placeholder='Enter your email'
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="mt-1 p-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className='anim-item'>
                <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Password</label>
                <input
                  type='password'
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
                  placeholder='Create a password'
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="mt-1 p-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className='anim-item'>
                <label className='block mb-1.5 text-xs font-medium text-[#333333]'>Confirm Password</label>
                <input
                  type='password'
                  id='rePassword'
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full bg-[#F5F2EE] border text-[#2C2018] text-sm rounded-xl px-3 py-1.5 sm:py-1 outline-none border-[#E8D4B8] focus:ring-2 focus:ring-[#D4A574]/20 placeholder:text-[#C0B0A0]'
                  placeholder='Confirm your password'
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className="mt-1 p-2 text-sm text-red-500 rounded-xl bg-[#fda5d5]/20" role="alert">
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div className='anim-item'>
                {loading ? (
                  <button type="submit" className="text-white bg-[#D4A574] w-full box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-[14px] text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
                    <i className='fas fa-spinner fa-spin'></i>
                  </button>
                ) : (
                  <button type="submit" className="text-white bg-[#D4A574] w-full box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-[14px] text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
                    Create Account
                  </button>
                )}
              </div>

              {/* Login link */}
              <p className='anim-item text-xs text-[#4A4A4A] text-center mt-3 sm:mt-4'>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className='text-[#D4A574] font-medium hover:underline'>
                  Login
                </button>
              </p>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
