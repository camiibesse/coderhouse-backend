import { productManager } from "../app.js";

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("Cliente conectado con el ID:",socket.id)
        const listadeproductos=await productManager.getProducts()

        socketServer.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await productManager.addProduct(obj)
            const listadeproductos=await productManager.getProducts()
            socketServer.emit("enviodeproducts",listadeproductos)
            })

            socket.on("deleteProduct",async(pid)=>{               
               await productManager.deleteProduct(pid)
                const listadeproductos=await productManager.getProducts()
                socketServer.emit("enviodeproducts",listadeproductos)
                })
        
    })
};

export default socketProducts;