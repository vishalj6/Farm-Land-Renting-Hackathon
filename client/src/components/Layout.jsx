import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
    return (
        <div className='main-layout p-3 h-screen w-full'>
            <div className='bg-[url(./assets/demo01-slide-001.jpg)] h-full rounded-2xl overflow-hidden'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default Layout