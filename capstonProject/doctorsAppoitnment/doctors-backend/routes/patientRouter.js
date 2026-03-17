import { Router } from "express";

const patientRouter = Router();

patientRouter.get('/', (req, res) => {
    res.send('Hello, World! from patientRouter');
});

export default patientRouter;