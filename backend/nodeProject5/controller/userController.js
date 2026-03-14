import { loginService, registerService, getProfileService, getAllUsersService } from "../service/userService.js"
import getUserIdFromToken from "../helper/getUserIdFromToken.js";
const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;
        const result = await loginService(email, password);
        res.status(200).json({message: 'Login successful', data: result})
    }
    catch(error){
        const errorMessage = error.message || 'Login failed';
        if (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('invalid password')) {
            return res.status(401).json({message: 'Invalid credentials. Please check your email and password.'});
        }
        res.status(500).json({message: 'Server error', error: errorMessage})
    }
}

const registerController = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const result = await registerService(name, email, password, role);
        res.status(201).json({message: 'Registration successful', data: result})
    }
    catch(error){
        const errorMessage = error.message || 'Registration failed';
        if (errorMessage.toLowerCase().includes('email already in use')) {
            return res.status(409).json({message: errorMessage});
        }
        res.status(500).json({message: 'Server error', error: errorMessage})
    }
}

const profileController = async(req, res) => {
    try{
        const userId = getUserIdFromToken(req);
        const result = await getProfileService(userId);
        res.status(200).json({message: 'User profile retrieved successfully', data: result})
    }
    catch(error){
        const errorMessage = error.message || 'Profile retrieval failed';
        if (errorMessage.toLowerCase().includes('user not found')) {
            return res.status(404).json({message: 'User profile not found'});
        }
        res.status(500).json({message: 'Server error', error: errorMessage})
    }
}


const getAllUsersController = async(req, res) => {
    try{
        const users = await getAllUsersService();
        res.status(200).json({message: 'Users retrieved successfully', data: users})
    }
    catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

export {loginController, registerController, profileController, getAllUsersController};