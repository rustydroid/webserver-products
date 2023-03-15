import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export const getCarts = async (req, res) => {
  try {
    let carts = await cartModel.find();
    res.send({ result: "Success", payload: carts });
  } catch (error) {
    console.log("No se pudo cargar la lista de carritos: " + error);
    res.status(500).send({
      error: "No se pudo cargar la lista de carritos",
      message: error,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    let cId = req.params;
    if (!cId)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let cart = await cartModel.findOne({ _id: cId });
    if (cart.length === 0)
      return res.status(400).send({
        error: "Not Found",
        message: "Producto no encontrado",
      });
    res.send({ result: "Success", payload: cart });
  } catch (error) {
    console.error("No se pudo buscar el carrito: " + error);
    res
      .status(500)
      .send({ error: "No se pudo buscar el carrito", message: error });
  }
};

export const createCart = async (req, res) => {
  try {
    let cart = req.body;
    //   if (!cart.pId || !cart.quantity)
    //       return res.status(400).send({ error: "Datos requeridos no enviados" });
    let newCart = await cartModel.create(cart);
    res.status(201).send({ result: "Success", payload: newCart });
  } catch (error) {
    console.error("No se pudo crear el carrito: " + error);
    res
      .status(500)
      .send({ error: "No se pudo crear el carrito", message: error });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    let cId = req.params.cid;
    let pId = req.params.pid;
    let body = req.body;
    let qty = parseInt(body["quantity"]);
    if (!cId || !pId)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let cart = await cartModel.findOne({ _id: cId });
    let product = await productModel.findOne({ _id: pId });
    if (cart.length === 0 || product.length === 0)
      return res.status(400).send({
        error: "Carrito o Producto Inexistente",
        cart: cart.length,
        product: product.length,
      });
    let productPosition = cart.products.findIndex(
      (product) => product.pid === pId
    );
    if (productPosition < 0) {
      console.log("Producto no en carrito");
      let newProduct = { pid: pId, quantity: qty };
      let listProducts = cart.products;
      let productUpdate = await cartModel.updateOne(
        { _id: cId },
        { $push: { products: newProduct } }
      );
      res.send({
        result: "Success, Product updated",
        payload: productUpdate,
      });
    } else {
      console.log("Producto en carrito");
      let oldQty = parseInt(cart.products[productPosition].quantity);
      let newQty = oldQty + qty;
      const filter = {
        _id: cId,
        products: { $elemMatch: { pid: pId } },
      };
      const update = {
        $set: { "products.$.quantity": newQty },
      };
      let productUpdate = await cartModel.updateOne(filter, update);
      res.send({
        result: "Success, Product updated",
        payload: productUpdate,
      });
    }
  } catch (error) {
    console.error("No se pudo actualizar el carrito: " + error);
    res
      .status(500)
      .send({ error: "No se pudo actualizar el carrito", message: error });
  }
};

export const deleteCart = async (req, res) => {
  try {
    let cId = req.params.cid;
    if (!cId)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let cart = await cartModel.findOne({ _id: cId });
    if (cart.length === 0)
      return res.status(400).send({
        error: "Not Found",
        message: "Carrito no encontrado",
      });
    let deleteCart = await cartModel.deleteOne({ _id: cId });
    res.send({ result: "Success, Cart deleted", message: deleteCart });
  } catch (error) {
    console.error("No se pudo borrar el carrito: " + error);
    res
      .status(500)
      .send({ error: "No se pudo borrar el carrito", message: error });
  }
};
