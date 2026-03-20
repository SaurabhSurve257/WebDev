import {Router} from "express";
import { loginController, regsiterController } from "../controller/authController.js";
import { validateLoginBody, validateRegisterBody } from "../middleware/authMiddleware.js";

const authRouter = Router();

// POST /auth/register - Register a new user (patient or doctor)
authRouter.post("/register", validateRegisterBody, regsiterController);

// POST /auth/login - Login a user and return a JWT token
authRouter.post("/login", validateLoginBody, loginController );

export default authRouter;