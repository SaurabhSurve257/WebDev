import axios from 'axios';

const URL = import.meta.env.VITE_Bakend_URL;


 const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${URL}/api/users/login`, { email, password });
        const token = response?.data?.data?.token || response?.data?.token;
        if (!token) {
            throw new Error('Login token not returned by server');
        }
        return token;
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};
export const registerUser = async (name , email, password, role) => {   
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

export { loginUser, getUserProfile, getallUsers}
