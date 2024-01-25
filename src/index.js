import express from "express";
import { ProductManager } from "./productManager.js";
import { productsRouter } from "./routes/products.router.js";
import { CartManager } from "./cartManager.js";
import { cartsRouter } from "./routes/carts.router.js";

const PORT = 3000;
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use('/api/products', productsRouter) // http://localhost:PORT/api/products
app.use('/api/carts', cartsRouter) // http://localhost:PORT/api/carts

app.listen(PORT, (req, res) =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})