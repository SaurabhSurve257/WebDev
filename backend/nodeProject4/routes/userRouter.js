import { Router } from "express";
import userdata from "../utils/data.js";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('UserRouter is working!');
});

userRouter.get('/getAllUserdata', (req, res) => {
    res.json(userdata);
});

userRouter.post('/addUserdata', (req, res) => {
    try{
        const { userId, userName, UserEmail, passwoerd } = req.body;
        const newUser={
            userId,
            userName,
            UserEmail,
            passwoerd
        }
        userdata.push(newUser);
        res.status(201).json({message: 'User data added successfully', user: newUser});
    }catch(error){
        res.status(500).json({message: 'Error adding user data', error: error.message});    
        }
    });

    userRouter.put('/updateUserdata/:userId', (req, res) => {
        try{
            const { userId } = req.params;
            const { userName, UserEmail, passwoerd } = req.body;
            const userIndex = userdata.findIndex(user => user.userId === userId);
            if(userIndex === -1){
                return res.status(404).json({message: 'User not found'});
            }
            userdata[userIndex] = {
                userId,
                userName,
                UserEmail,
                passwoerd
            };
            res.json({message: 'User data updated successfully', user: userdata[userIndex]});
        }catch(error){
            res.status(500).json({message: 'Error updating user data', error: error.message});
        }
    });

    userRouter.delete('/deleteUserdata/:userId', (req, res) => {
        try{
            const { userId } = req.params;  
            const userIndex = userdata.findIndex(user => user.userId === userId);
            if(userIndex === -1){
                return res.status(404).json({message: 'User not found'});
            }
            const deletedUser = userdata.splice(userIndex, 1);
            res.json({message: 'User data deleted successfully', user: deletedUser[0]});
        }catch(error){
            res.status(500).json({message: 'Error deleting user data', error: error.message});
        }
    });

export default userRouter;  