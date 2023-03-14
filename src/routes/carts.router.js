import { response, Router } from "express";

// Import controllers for Filesystem
import { getCarts, getCartById, createCart, addProductToCart } from "../dao/Filesystem/controllers/cart.controller.js"


const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/product/:pid", addProductToCart);

export default router;
