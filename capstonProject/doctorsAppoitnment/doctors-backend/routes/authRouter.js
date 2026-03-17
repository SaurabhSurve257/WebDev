import {Router} from 'express';
const authRouter = Router();

authRouter.get('/', (req, res) => {
    res.send('Hello, World! from authRouter');
}
);

export default authRouter;
