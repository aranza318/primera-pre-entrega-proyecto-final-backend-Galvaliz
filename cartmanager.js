import fs from "fs"

export default class CartManager {
    constructor() {
        this.carts = [];
        this.path = "Carrito.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        }
    }
    //Crea el nuevo carrito
    newCart() {
        this.carts.push({id:this.generateId(), products:[]});
        this.saveCart();
        console.log("SE CREO EL CARRITO");

        return true;
    }
    //Obtiene el carrito por su id
    getCart(id) {
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return this.carts.find(item => item.id === id);
    }
    //Muestra el array de carritos
    getCarts() {
        let carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return carts;
    }
    //Genera el id para cada carrito
    generateId() {
        let max = 0;
        let carts = this.getCarts();

        carts.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max+1;
    }
    //Guarda el carrito
    saveCart() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }
    //Agrega el producto seleccionado por su id al carrito seleccionado por este mismo metodo
    addProductToCart(cid, pid) {
        this.carts = this.getCarts();
        const cart = this.carts.find(item => item.id === cid);
        let product = cart.products.find(item => item.product === pid);

        if (product) {
            product.quantity+= 1;
        } else {
            cart.products.push({product:pid, quantity:1});
        }

        this.saveCart();
        console.log("PRODUCTO AGREGADO");

        return true;
    }    
    }