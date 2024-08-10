import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-[#0000004f] text-white">
            <div className="container mx-auto px-5 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">
                    LOGO
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-amber-400">Home</Link>
                    <Link to="/farm-details" className="hover:text-amber-400">Details</Link>
                    <Link to="/signup" className="hover:text-amber-400">SignUp</Link>
                    <Link to="/login" className="hover:text-amber-400">Login</Link>
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
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-700">SignUp</Link>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
