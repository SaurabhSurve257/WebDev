import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import dbConnect from './utils/dbConnect.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// add cors  middelware for localhost 5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



dbConnect();

app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});