import express from 'express'
import adminRouter from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
