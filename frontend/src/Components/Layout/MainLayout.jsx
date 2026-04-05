import React from 'react'
import MainNavbar from '../MainNavbar/MainNavbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return <>
    <MainNavbar/>
        <Outlet/>
    <Footer/>
  </>
}
