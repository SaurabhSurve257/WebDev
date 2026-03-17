import { Router } from "express";

const appointmentRouter = Router();

appointmentRouter.get('/', (req, res) => {
    res.send('Hello, World! from appointmentRouter');
}
);



export default appointmentRouter;