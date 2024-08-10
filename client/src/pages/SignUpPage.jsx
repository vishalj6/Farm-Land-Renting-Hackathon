import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    profilePic: null
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle the file upload and other form submissions
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = dispatch(registerUser(formDataToSend));
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error('Error registering, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('./assets/banner.jpg')] bg-[#070d3f1a] bg-blend-overlay bg-cover bg-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-[#0000004f] shadow-md rounded-lg p-8 backdrop-blur-[3px] border-[1px] border-slate-700">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600  bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">Profile Picture</label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
                name="profilePic"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="text-indigo-400 hover:underline">
              Already have an account? Login
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

export default SignUpPage;
