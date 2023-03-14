import express from "express";
import mongoose from 'mongoose'
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./util.js";

//Declrando Express para usar sus funciones.
const app = express();

// mongoose instance
const db = mongoose;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
  console.log(__dirname);
});

const connectMongoDBAtlas = async () => {
  try {
    await db.connect(
      "mongodb+srv://test_nodejs:6qExgwEHjb0CXA5F@cluster0.tshmlcu.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Conectado con exito a Mongo Atlas");
  } catch (error) {
    console.error("No se pudo conectar a DB: " + error);
    process.exit();
  }
};
connectMongoDBAtlas();
