import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    const { token } = useSelector((state) => state.auth);

    return (
        <nav className="bg-[url(./assets/demo01-slide-001.jpg)] rounded-b-3xl bg-blend-multiply overflow-hidden bg-[#0000004f] text-white">
            <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">
                    Farm Connect
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="hover:text-amber-400">Home</Link>
                    <Link to="/farm-details" className="hover:text-amber-400">Details</Link>

                    {!token && <Link to="/signup" className="hover:text-amber-400">SignUp</Link>}
                    {!token && <Link to="/login" className="hover:text-amber-400">Login</Link>}
                    <Link to="/buyer-page" className="border-lime-500 bg-[#00820bb3] px-3 py-2 rounded-xl hover:text-[#ffffffc8] hover:bg-[#217a0e8e]">Become a Buyer</Link>
                    <button onClick={handleLogout} className="border-2 border-[#600e006c] px-3 py-2 rounded-xl hover:text-[#ffffffc8] hover:bg-[#aa13139c]">Logout</button>

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center px-3 py-2 border rounded text-gray-400 border-gray-600 hover:text-white hover:border-white"
                    onClick={toggleMobileMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#0000004f] text-white`}>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
                <Link to="/farm-details" className="block px-4 py-2 hover:bg-gray-700">Details</Link>
                {!token && <Link to="/signup" className="block px-4 py-2 hover:bg-gray-700">SignUp</Link>}
                {!token && <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>}
                <Link to="/buyer-page" className="border-lime-500 bg-[#00820bb3] px-3 py-2 rounded-xl hover:text-white hover:bg-[#217a0e8e]">Become a Buyer</Link>

            </div>
        </nav>
    );
};

export default Navbar;
