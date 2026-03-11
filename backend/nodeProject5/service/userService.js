import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const loginService = async (email, password) => {
   try{
        const user = await User.findOne({email});
     
        if(!user){
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error('Invalid password');
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return {token};

   }
   catch(error){
         throw new Error(error.message);
   }
}

const registerService = async(name, email, password, role) => {
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, 
            email, 
            password: hashedPassword, 
            role
        });
        await newUser.save();
        return {name: newUser.name, email: newUser.email, role: newUser.role};

    }
    catch(error){
        throw new Error(error.message);
    }
}

const getProfileService = async(userId) => {
    try{
        const user = await User.findById(userId).select('-password');
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
}


const getAllUsersService = async() => {
    try{
        const users = await User.find().select('-password');
        return users;
    }
    catch(error){
        throw new Error(error.message);
    }
}


export {loginService, registerService, getProfileService, getAllUsersService};