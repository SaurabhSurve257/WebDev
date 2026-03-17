import e, {Roter} from 'express';

const doctorRouter = Roter();

doctorRouter.get('/', (req, res) => {
    res.send('Hello, World! from doctorRouter');
});

export default doctorRouter;