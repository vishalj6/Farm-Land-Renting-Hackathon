import React from 'react'
import Navbar from './Navbar'

const Home = () => {
    return (
        <div className='main-layout p-3 min-h-screen w-full text-lg'>
            <div className='bg-[url(./assets/demo01-slide-001.jpg)] h-full rounded-2xl overflow-hidden'>
                <div className="px-1">
                    <Navbar />
                </div>
                <div className='font-signika min-h-[400px] h-full flex justify-start items-center ms-10  text-white'>
                    <div>
                        <p className='text-5xl font-semibold mt-[-4%]'>
                            Add soil Details
                        </p>
                        <a href="/farm-details" className='text-gray-300'>add your soil details here</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home