import { response, Router } from "express";
import CartManager from "../modules/cartManager.js";
import ProductManager from "../modules/productManager.js";

const router = Router();
let cartManager = new CartManager();
let productManager = new ProductManager();
cartManager.checkFileExist();

router.get("/", async (request, response) => {
  let limit = parseInt(request.query.limit);
  let queryLimited = [];
  console.log("Consumiendo api GET /api/carts...");
  console.log("Esperando Carritos");
  let cartsFile = await cartManager.readCarts();
  if (limit !== undefined && limit <= cartsFile.length) {
    for (let i = 0; i < limit; i++) {
      queryLimited.push(cartsFile[i]);
    }
    cartsFile = queryLimited;
  }
  console.log(cartsFile);
  response.send(JSON.stringify(cartsFile));
});

router.get("/:cid", async (request, response) => {
  let cId = parseInt(request.params.cid);
  let carts = await cartManager.readCarts();
  const cartPosition = carts.findIndex((cart) => cart.id === cId);
  console.log("Cart Position", cartPosition);
  if (cartPosition < 0) {
    return response
      .status(404)
      .send({ status: "info", message: "Carrito no encontrado" });
  }
  console.log("Carrito encontrado: ", carts[cartPosition]);
  return response.send({
    status: "Success",
    message: "Carrito Encontrado.",
    data: carts[cartPosition],
  });
});

router.post("/", async (request, response) => {
  let products = request.body;
  let cartId = Math.floor(Math.random() * 100000 + 1);
  await cartManager.addCart(cartId);
  return response.send({
    status: "Success",
    message: "Carrito Creado.",
    data: `Carrito creado con el ID: ${cartId}`,
  });
});

router.post("/:cid/product/:pid", async (request, response) => {
  let cid = parseInt(request.params.cid);
  let pid = parseInt(request.params.pid);
  let body = request.body;
  let qty = parseInt(body["quantity"]);
  let carts = await cartManager.readCarts();
  let products = await productManager.returnProducts();
  const productPosition = products.findIndex((product) => product.id === pid);
  const cartPosition = carts.findIndex((cart) => cart.id === cid);
  if (cartPosition < 0) {
    return response
      .status(404)
      .send({ status: "info", message: "Carrito no encontrado" });
  }
  console.log(`Carrito: ${cid}, Producto: ${pid}, Cantidad: ${qty}`);
  if (productPosition < 0) {
    return response
      .status(404)
      .send({ status: "info", message: "Producto no valido" });
  }
  console.log(`Carrito: ${cid}, Producto: ${pid}, Cantidad: ${qty}`);
  cartManager.updateCart(cid, pid, qty, cartPosition);
  return response.send({
    status: "Success",
    message: "Carrito Actualizado.",
    data: carts[cartPosition],
  });
});

export default router;
