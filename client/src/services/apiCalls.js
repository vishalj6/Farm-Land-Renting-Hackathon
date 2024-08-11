import axios from 'axios';

const API_BASE_URL = `http://localhost:8000/api/v1` || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const loginUserApi = async (formData) => {
    try {
        const response = await apiClient.post('/auth/login', formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to register a new user
export const registerUserApi = async (formData) => {
    try {
        const response = await apiClient.post('/auth/signup', formData);
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


// Function to fetch lands
export const fetchLandsApi = async () => {
    try {
        const response = await apiClient.get('/lands');
        return response.data; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a new land
export const addLandApi = async (landData) => {
    try {
        const response = await apiClient.post('/lands', landData);
        console.log(response);
        return response.data; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
};

// Function to update land data
export const updateLandApi = async (id, data) => {
    try {
        const response = await apiClient.put(`/lands/${id}`, data);
        return response.data; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
};