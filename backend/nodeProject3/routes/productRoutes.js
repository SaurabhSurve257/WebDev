import { Router } from "express";

const productRouter = Router();

productRouter.get('/', (req, res) => {
    res.send("Products Router is running");
});

productRouter.get('/details', (req, res) => {
    res.send("Product Details Page");
});
productRouter.post('/details', (req, res) => {
    res.send("Product Details POST request received details updated");
});

productRouter.delete('/details', (req, res) => {
    res.send("Product Details DELETE request received details deleted");
});
export default productRouter;