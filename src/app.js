// import express, { request, response } from "express";
const express = require("express");

// Import ProductManager class and methods
const ProductManager = require("./productManager");
let productManager = new ProductManager();

//Declrando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port configuration
const SERVER_PORT = 8080;

app.get("/api/products", async (request, response) => {
  let limit = parseInt(request.query.limit);
  let queryLimited = [];
  console.log("Consumiendo api GET /api/products...");
  console.log("Productos actuales Actuales: ");
  console.log("Esperando Productos");
  let productsFile = await productManager.returnProducts();
  if (limit !== undefined && limit <= productsFile.length) {
    for (let i = 0; i < limit; i++) {
      queryLimited.push(productsFile[i]);
    }
    productsFile = queryLimited;
  }
  console.log(productsFile);
  response.send(JSON.stringify(productsFile));
});

app.get("/api/products/:pid", async (request, response) => {
  let pId = parseInt(request.params.pid);
  let products = await productManager.returnProducts();
  const productPosition = products.findIndex((product) => product.id === pId);
  console.log("Product Position", productPosition);
  if (productPosition < 0) {
    return response
      .status(404)
      .send({ status: "info", message: "Producto no encontrado" });
  }
  console.log("Producto encontrado: ", products[productPosition]);
  return response.send({
    status: "Success",
    message: "Producto Actualizado.",
    data: products[productPosition],
  });
});

app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});
