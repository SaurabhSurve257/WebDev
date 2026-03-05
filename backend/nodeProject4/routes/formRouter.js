import { Router } from "express";

const formRouter = Router();

formRouter.get('/form', (req, res) => {
    res.send('FormRouter is working!');
});

export default formRouter;