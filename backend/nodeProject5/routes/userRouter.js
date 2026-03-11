import {Router} from 'express'
import {loginController, registerController, profileController, getAllUsersController} from '../controller/userController.js'
import { loginRequired, registrationRequired } from '../middleware/userMiddleware.js';
import  userAuthentication  from '../middleware/userAuthentication.js';
import userAuthorization from '../middleware/userAuthorization.js';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('User route is working!');
});

userRouter.post('/login' , loginRequired, loginController);
userRouter.post('/register' , registrationRequired, registerController);


userRouter.get('/profile', userAuthentication, profileController);  //Auth

//protected route for admin to view all users
userRouter.get('/all-users', userAuthentication, userAuthorization,  getAllUsersController); //Auhorization(admin) + authentication



export default userRouter;