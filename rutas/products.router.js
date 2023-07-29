import { Router } from "express";
import ProductManager from "../productmanager.js";

const productsRouter = Router();
const manager = new ProductManager;


productsRouter.get("/", (request, response)=>{
    const products = manager.getProducts();
    const {limit} = request.query;
    response.send({products:limit ? products.slice(0, limit):products});

});

productsRouter.get("/:pid", (request, response)=>{
    const products = manager.getProducts();
    let pid = parseInt(request.params.pid); 
    response.send({product:products.find(item =>item.id === pid)|| "Error en el id del producto: Inexistente"});
});

productsRouter.post("/", (request,response)=>{
    
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
   
    if(!title){
        response.status(400).send({status:"error", message:"INGRESE EL TITULO O NOMBRE DEL PRODUCTO"});
        return false;
      }
    if(!description){
        response.status(400).send({status:"error", message:"INGRESE LA DESCRIPCION DEL PRODUCTO"});
        return false;
    }
    if(!code){
        response.status(400).send({status:"error", message:"INGRESE EL CODIGO DEL PRODUCTO"});
        return false;
      }
    if(!price){
        response.status(400).send({status:"error", message:"INGRESE EL PRECIO DEL PRODUCTO"});
        return false;
    }
    status = !status && true;
    if(!stock){
        response.status(400).send({status:"error", message:"INGRESE EL STOCK DISPONIBLE DE ESTE PRODUCTO"});
        return false;
    }
    if(!category){
        response.status(400).send({status:"error", message:"INGRESE LA CATEGORIA DEL PRODUCTO"});
        return false;
    }
    if(!thumbnail){
        response.status(400).send({status:"error", message:"INGRESE LA IMAGEN DEL PRODUCTO"});
        return false;
    } else if ((!Array.isArray(thumbnail))||(thumbnail.lenght == 0)){
        response.status(400).send({status:"error", message:"INGRESE AL MENOS UNA IMAGEN DEL PRODUCTO"});
        return false;
    }

    if (manager.addProduct({title, description, code, price, status, stock, category, thumbnail})){
        response.send({status:"ok", message:"Ya se agrego el producto felicitaciones"});
    } else{
        response.status(500).send({status:"error", message:"ERROR AL CARGAR EL PRODUCTO"});
    }
    
});

productsRouter.put("/:pid", (request,response)=>{
    let pid = parseInt(request.params.pid); 
    
    let {title, description, code, price, status, stock, category, thumbnail} = request.body;
   
    if(!title){
        response.status(400).send({status:"error", message:"INGRESE EL TITULO O NOMBRE DEL PRODUCTO"});
        return false;
      }
    if(!description){
        response.status(400).send({status:"error", message:"INGRESE LA DESCRIPCION DEL PRODUCTO"});
        return false;
    }
    if(!code){
        response.status(400).send({status:"error", message:"INGRESE EL CODIGO DEL PRODUCTO"});
        return false;
      }
    if(!price){
        response.status(400).send({status:"error", message:"INGRESE EL PRECIO DEL PRODUCTO"});
        return false;
    }
    status = !status && true;
    if(!stock){
        response.status(400).send({status:"error", message:"INGRESE EL STOCK DISPONIBLE DE ESTE PRODUCTO"});
        return false;
    }
    if(!category){
        response.status(400).send({status:"error", message:"INGRESE LA CATEGORIA DEL PRODUCTO"});
        return false;
    }
    if(!thumbnail){
        response.status(400).send({status:"error", message:"INGRESE LA IMAGEN DEL PRODUCTO"});
        return false;
    } else if ((!Array.isArray(thumbnail))||(thumbnail.lenght == 0)){
        response.status(400).send({status:"error", message:"INGRESE AL MENOS UNA IMAGEN DEL PRODUCTO"});
        return false;
    }

    if (manager.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnail})){
        response.send({status:"ok", message:"Ya se actualizo el producto felicitaciones"});
    } else{
        response.status(500).send({status:"error", message:"ERROR AL ACTUALIZAR EL PRODUCTO"});
    }

});

productsRouter.delete("/:pid", (request, response) => {
    const pid = parseInt(request.params.pid); 
    
    if (manager.deleteProduct(pid)) {
        response.send({status:"ok", message:"Se eliminó el producto correctamente!"});
    } else{
        response.status(500).send({status:"error", message:"Error! No se pudo eliminar el producto!"});
    }

});

export default productsRouter;