import { Router } from "express";
const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send("Users Router is running");
});
export default userRouter;