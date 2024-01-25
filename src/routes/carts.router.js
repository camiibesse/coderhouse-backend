import { Router } from "express";
import { cartManager } from "../index.js";

const cartsRouter = Router();

//crear un nuevo carrito : http://localhost:3000/api/carts
cartsRouter.post('/', async (req, res)=>{
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito')
    }
})

cartsRouter.get('/:cid', async (req, res)=>{
    //devuelve todos los carritos de un usuario por su id
    const {cid} =req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al intentar enviar los productos del carrito')
    }
})

//agregar un producto a un carrito
cartsRouter.post('/:cid/products/:pid', async (req, res)=>{
    const{cid, pid}= req.params;
    try {
        await cartManager.addProductToCart(cid, pid)
        res.send('Producto agregado al carrito')
    } catch (error) {
        res.send('Error al intentar guardar el producto en el carrito')
    }
})


export {cartsRouter};