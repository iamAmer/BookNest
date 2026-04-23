import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import GuestNavbar from '../GuestNavbar/GuestNavbar.jsx'

export default function GuestLayout() {
    return <>
        <GuestNavbar/>
            <Outlet/>
        <Footer/>
    </>
}
