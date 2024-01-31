import { Router } from "express";
import { productManager } from "../app.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req,res)=>{
    const products= await productManager.getProducts()
    res.render("home", {
        title: 'Home',
        products
    })
})

viewsRouter.get("/realtimeproducts", async (req,res)=>{
    res.render("realtimeproducts")
})

export {viewsRouter};