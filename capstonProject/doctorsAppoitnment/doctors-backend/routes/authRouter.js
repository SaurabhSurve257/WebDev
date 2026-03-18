import {Router} from "express";
import { loginController, registerController}  from "../controller/authController.js";
import {validateRegisterBody, validateLoginBody} from "../middleware/validationMiddleware.js";


const authRouter = Router();

authRouter.post("/register", validateRegisterBody, registerController);
authRouter.post("/login", validateLoginBody, loginController);
 

export default authRouter;