import { response, Router } from "express";

// Import controllers for Filesystem
// import { getCarts, getCartById, createCart, addProductToCart } from "../dao/Filesystem/controllers/cart.controller.js"

import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  deleteCart,
} from "../dao/mongodb/controllers/cart.controller.js";


const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.put("/:cid/product/:pid", addProductToCart);
router.delete("/:cid", deleteCart);

export default router;
