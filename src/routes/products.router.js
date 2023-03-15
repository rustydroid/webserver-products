import { Router } from "express";

// Import Products controllers for Filesystem
// import { getProducts, getProductById, createProduct, updateProductById, deleteProduct } from '../dao/Filesystem/controllers/products.controller.js'

// Import Products controllers for MongoDB
import {getProducts, getProductById, createProduct, updateProductById, deleteProduct} from '../dao/mongodb/controllers/product.controller.js'

const router = Router();

// router.get("/", getProducts);

// router.get("/:pid", getProductById);

// router.post("/", createProduct);

// router.put("/:pid", updateProductById);

// router.delete("/:pid", deleteProduct);

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:pid")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProduct);

export default router;
