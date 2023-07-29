import express from "express";
import cartRouter from "./rutas/carts.router.js";
import productsRouter from "./rutas/products.router.js";

const app = express();
const puerto =8080;

app.use(express.json());

app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);

app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});