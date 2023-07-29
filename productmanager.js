import fs from "fs"

export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
        this.createFile();
    }
   
    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }
    //Agrega el producto validando el codigo y denominandole su id propio e irrepetible
    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log("Error! Code exists!");

            return false;
        } else {
            const producto = {id:this.generateId(), title:product.title, description:product.description, code:product.code, price:product.price, status:product.status, stock:product.stock, category:product.category, thumbnails:product.thumbnails};
            this.products = this.getProducts();
            this.products.push(producto);
            this.saveProducts();
            console.log("Product added!");

            return true;
        }
    }
    //Actualiza el producto segun su id
    updateProduct(id, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].code = product.code;
            this.products[pos].price = product.price;
            this.products[pos].status = product.status;
            this.products[pos].stock = product.stock;
            this.products[pos].category = product.category;
            this.products[pos].thumbnails = product.thumbnails;
            this.saveProducts();
            console.log("Product updated!");

            return true;
        } else {
            console.log("Not found!");

            return false;
        }
    }
    //Borra el producto segun su id
    deleteProduct(id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1); (0,1)
            this.saveProducts();
            console.log("Product #" + id + " deleted!");

            return true;
        } else {
            console.log("Not found!");

            return false;
        }
    }
    //Lee el array de productos
    getProducts() {
        let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return products;
    }
    //Obtiene un producto segun su id
    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return this.products.find(item => item.id === id) || "Not found";
    }
    //Valida el codigo del producto
    validateCode(code) {
        return this.products.some(item => item.code === code);
    }
    //Genera el id de cada producto
    generateId() {
        let max = 0;
        let products = this.getProducts();

        products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max+1;
    }
    //Guarda cada producto en el array
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
    }
