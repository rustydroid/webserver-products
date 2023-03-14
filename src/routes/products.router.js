import { Router } from "express";

// Import Products controllers for Filesystem
import {getProducts, getProductsById, createProduct, updateProductById, deleteProduct} from '../dao/Filesystem/controllers/products.controller.js'

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductsById);

router.post("/", createProduct);

router.put("/:pid", updateProductById);

router.delete("/:pid", deleteProduct);

export default router;
