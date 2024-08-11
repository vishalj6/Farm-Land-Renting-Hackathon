import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="newsletter-content-wrapper text-center bg-[#000000c5] bg-blend-overlay bg-[url(./assets/footer-image.jpg)] bg-center bg-cover min-h-[300px] flex items-center justify-center flex-col">
                <h4 className="mb-4" style={{ color: 'rgb(255, 255, 255)' }}>
                    Get News Updates Special Event Notices And <br /> More When You Join Our Email List
                </h4>
                <form className='flex justify-center items-center gap-3'>
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        className="px-5 py-3 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full min-w-[300px]"
                    />
                    <button className="border-lime-500 bg-[#00820b] px-3 py-2 rounded-full text-white hover:bg-[#20790e] fw-light" type="submit">
                        Subscribe
                    </button>
                </form>
                <div className="newsletter-content-wrapper text-center mt-4">
                    <h5 style={{ color: 'rgb(255, 255, 255)' }}>Available on</h5>
                    <div style={{ display: 'flex', placeContent: 'center' }}>
                        {/* Image here */}
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-12 w-full">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Agrimo</h2>
                        <p className="text-gray-400 mb-4">
                            Mauris sed molestie sem. Sed vel vestibulum elit, non accumsan risus. In vitae sapien viverra est. Duo ei ullum inani senserit.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Professional & Modern</h2>
                        <p className="text-gray-400 mb-4">
                            A theme designed to help your business stand out from the rest.
                        </p>
                        <ul className="text-gray-400 space-y-2">
                            <li>
                                <a href="#" className="hover:text-white">Company</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Our Address</h2>
                        <p className="text-gray-400 mb-4">
                            Old Westbury 256, New York <br />
                            11201, United States
                        </p>
                        <p className="text-gray-400">
                            Mon - Fri: 9.00am - 5.00pm <br />
                            Saturday: 10.00am - 6.00pm <br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="container mx-auto text-center px-4">
                        <p className="text-gray-400">
                            &copy; 2024 <a href="#" className="text-white hover:text-green-500">Agrimo</a>, All Rights Reserved.
                        </p>
                        <p className="text-gray-400 mt-2">
                            <a href="#" className="hover:text-white">Terms & Conditions</a> | <a href="#" className="hover:text-white">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Footer