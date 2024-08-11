import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Home = () => {
    return (
        <>
            <div className='main-layout p-3 w-full text-lg'>
                <div className='bg-[url(./assets/demo01-slide-001.jpg)] h-full rounded-2xl overflow-hidden'>
                    <Navbar />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-8 mb-10 mt-4">
                <div className="bg-gray-800 text-white rounded-lg shadow-md p-5 transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold">Soil Quality Tips</h2>
                    <p className="mt-2 text-gray-400">Discover the best practices for maintaining soil quality to optimize crop yield.</p>
                    <a href="/soil-tips" className="text-blue-400 mt-4 inline-block hover:text-blue-600">Learn More</a>
                </div>
                <div className="bg-gray-800 text-white rounded-lg shadow-md p-5 transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold">Partnership Opportunities</h2>
                    <p className="mt-2 text-gray-400">Explore available land partnerships and collaborate with other farmers.</p>
                    <a href="/partnerships" className="text-blue-400 mt-4 inline-block hover:text-blue-600">Explore Now</a>
                </div>
                <div className="bg-gray-800 text-white rounded-lg shadow-md p-5 transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold">AI-Powered Crop Suggestions</h2>
                    <p className="mt-2 text-gray-400">Get AI-driven insights on the best crops to grow based on your soil data.</p>
                    <a href="/ai-crop-suggestions" className="text-blue-400 mt-4 inline-block hover:text-blue-600">Get Suggestions</a>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Home