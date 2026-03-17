import express from 'express'
import todoRoutes from './routes/todos.js';

const app = express()
const port = 3000

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

