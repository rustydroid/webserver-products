import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./modules/productManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.router.js";
import __dirname from "./util.js";

//Declrando Express para usar sus funciones.
const app = express();
let productManager = new ProductManager();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
//Uso de vista de plantillas
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
  console.log(__dirname);
});

// Instancio socket.io
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("new_product", async (data) => {
    // console.log("Mensaje recibido: " + data.title + data.description);
    console.log("Mensaje recibido: " + data.title + data.description);
    let productId = Math.floor(Math.random() * 100000 + 1);
    await productManager.addProduct(productId,data.title,data.description,data.code,data.price,data.status,data.stock,data.category,data.thumbnails);
    let products = await productManager.returnProducts();
    socket.emit("get_products", products);
  });
});
