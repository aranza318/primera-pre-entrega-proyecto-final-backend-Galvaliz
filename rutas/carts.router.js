import { Router } from "express";
import CartManager from "../cartmanager.js";

const manager = new CartManager;

const cartRouter = Router();


cartRouter.post("/", (request, response)=>{
  if(manager.newCart()){
    response.send ({status:"ok", message:"Carrito creado correctamente"});
  } else {
    response.status(500).send({status:"error", message:"El carrito no pudo ser creado correctamente"});
  }
  
});


cartRouter.get("/:cid",(request, response)=>{
  const cid = parseInt(request.params.cid); 
  const cart =  manager.getCart(cid);
  
  if(cart){
      response.send({products: cart.products});
  } else{
      response.status(400).send ({status:"Error", mesagge:"No existe el carrito"});
  } 
});

cartRouter.post("/:cid/products/:pid", (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const cart = manager.getCart(cid);

  if (cart) {
      if (manager.addProductToCart(cid, pid)) {
          res.send({status:"ok", message:"El producto se agregó correctamente"});
      } else {
          res.status(400).send({status:"error", message:"Error: No se pudo agregar el Producto al Carrito"});
      }
  } else {
      res.status(400).send({status:"error", message:"Carrito inexistente"});
  }
});


export default cartRouter;