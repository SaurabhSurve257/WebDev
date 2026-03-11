import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import dbConnect from './utils/dbConnect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});