import express, { urlencoded } from "express";
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import __dirname from "./utils.js";
import * as path from 'path';
import handlebars, { engine } from "express-handlebars";
import { Server } from "socket.io";
import socketProducts from "./listeners/socketProducts.js";


const PORT = 3000;
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;


app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

//configuracion de handlebars
app.engine("handlebars", engine());
app.set("views", path.resolve(__dirname + "/views"));
app.set("view engine", "handlebars");

app.use('/api/products', productsRouter) // http://localhost:PORT/api/products
app.use('/api/carts', cartsRouter) // http://localhost:PORT/api/carts
app.use('/', viewsRouter)

const httpServer = app.listen(PORT, (req, res) =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketProducts(socketServer);