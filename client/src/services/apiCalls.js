import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const loginUserApi = async (formData) => {
    try {
        const response = await apiClient.post('/users/login', formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to register a new user
export const registerUserApi = async (formData) => {
    try {
        const response = await apiClient.post('/users/register', formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to fetch user data
export const fetchUserDataApi = async (token) => {
    try {
        const response = await apiClient.get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
