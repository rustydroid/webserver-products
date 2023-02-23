import express, { Router } from "express";
import ProductManager from "../modules/productManager.js";

const router = new Router();
let productManager = new ProductManager();

router.get("/", async (req, res) => {
  let products = await productManager.returnProducts();
  res.render("home", {style: 'home.css', products});
});

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });

export default router;
