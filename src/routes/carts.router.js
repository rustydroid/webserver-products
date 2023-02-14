import { Router} from "express";
import CartManager from "../modules/cartManager.js";

const router = Router();
let cartManager = new CartManager();
cartManager.checkFileExist();
// (async () => {
//   await cartManager.checkFileExist();
// })();

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

router.post("/", async (request, response) => {
  let products = request.body;
  let cartId = Math.floor(Math.random() * 100000 + 1);
  await cartManager.addCart(cartId, products);
  return response.send({
    status: "Success",
    message: "Carrito Creado.",
    data: `Carrito creado con el ID: ${cartId}`,
  });
});

export default router;