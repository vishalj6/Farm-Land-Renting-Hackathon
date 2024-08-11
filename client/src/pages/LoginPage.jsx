import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        }

        if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            dispatch(loginUser(formData));
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error('Error logging in, please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[url('./assets/banner.jpg')] bg-[#070d3f1a] bg-blend-overlay bg-cover bg-center h-screen">
            <div className="w-full max-w-md">
                <div className="bg-[#0000004f] shadow-md rounded-lg p-8 backdrop-blur-[3px] border-[1px] border-slate-700">
                    <h3 className="text-2xl font-semibold text-white text-center mb-6">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute top-[60%] right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} className="text-gray-400" />
                            </button>
                            {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password}</div>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/signup" className="text-indigo-400 hover:underline">
                            Don't have an account? Register
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default LoginPage;