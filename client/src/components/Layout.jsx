import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
    return (
        <div className='main-layout min-h-screen w-full overflow-auto'>
            <div className='fixed w-full z-50'>
                <Navbar />
            </div>
            <div className="pt-[50px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout