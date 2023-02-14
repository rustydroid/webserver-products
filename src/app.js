import express from 'express';
import productsRouter from './routes/products.router.js';
// import cartsRouter from './routes/carts.router.js';
// import __dirname from "./util.js";


//Declrando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
//   console.log(__dirname);
});