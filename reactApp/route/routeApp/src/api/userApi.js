import axios from 'axios';

const URL = 'http://localhost:5000'; // Assuming backend is on 5000

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${URL}/api/users/login`, { email, password });
        return response.data.data.token;
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};

const registerUser = async (name, email, password, role) => {
    try {
        const response = await axios.post(`${URL}/api/users/register`, { name, email, password, role });
        return response.data;
    } catch (error) {
        console.error("Registration error: ", error);
        throw error;
    }
};

const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Get profile error: ", error);
        throw error;
    }
};

const getallUsers = async (token) => {
    try {
        const response = await axios.get(`${URL}/api/users/all-users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Get all users error: ", error);
        throw error;
    }
};

export { loginUser, registerUser, getUserProfile, getallUsers };