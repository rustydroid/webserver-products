import { Router } from "express";
import ProductManager from "../modules/productManager.js";

const router = Router();
let productManager = new ProductManager();
productManager.checkFileExist();

router.get("/", async (request, response) => {
  let limit = parseInt(request.query.limit);
  let queryLimited = [];
  console.log("Consumiendo api GET /api/products...");
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

router.get("/:pid", async (request, response) => {
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
    message: "Producto Encontrado.",
    data: products[productPosition],
  });
});

router.post("/", async(request, response) => {
  let {title, description, code, price, status,stock, category, thumbnails} = request.body;
  let productId = Math.floor(Math.random() * 100000 + 1);
  await productManager.addProduct(
    productId,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  return response.send({
    status: "Success",
    message: "Producto Creado.",
    data: `Producto creado con el ID: ${productId}`,
  });
});

export default router;
