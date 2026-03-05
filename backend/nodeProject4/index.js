// import { configDotenv } from 'dotenv';
import express from 'express';
// import { configDotenv } from 'dotenv';
import userRouter from './routes/userRouter.js';
import formRouter from './routes/formRouter.js';  
import dotenv from 'dotenv';

// dotenv.config();


// configDotenv();
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/users', userRouter);

app.use('/api/forms', formRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

