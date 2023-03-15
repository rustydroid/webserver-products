import { productModel } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    let products = await productModel.find();
    res.send({ result: "Success", payload: products });
  } catch (error) {
    console.error("No se pudo obtener los productos: " + error);
    res
      .status(500)
      .send({ error: "No se pudo obtener los productos", message: error });
  }
};

export const getProductById = async (req, res) => {
  try {
      let pId = req.params.pid;
    if (!pId)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let product = await productModel.find({ _id: pId });
    console.log("Producto result: " + product);
    if (product.length === 0)
      return res.send({
        result: "Not Found",
        message: "Producto no encontrado",
      });
    res.send({ result: "Success", payload: product });
  } catch (error) {
    console.error("No se pudo buscar el producto: " + error);
    res
      .status(500)
      .send({ error: "No se pudo buscar el producto", message: error });
  }
};

export const createProduct = async (req, res) => {
  try {
    let product = req.body;
    if (!product.title || !product.status)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let newProduct = await productModel.create({ ...product });
    res.status(201).send({ result: "Success", payload: newProduct });
  } catch (error) {
    console.error("No se pudo crear el producto: " + error);
    res
      .status(500)
      .send({ error: "No se pudo crear el producto", message: error });
  }
};

export const updateProductById = async (req, res) => {
  try {
    let pId = req.params.pid;
      let body = req.body;
      console.log("Update params: ", req.params.pid);
    console.log("Update ProductID: ", pId);
    if (!pId)
      return res
        .status(400)
        .send({
          error: "Datos requeridos no enviados updateProduct",
          message: pId,
        });
    let product = await productModel.find({ _id: pId });
    if (product.length === 0)
      return res.send({
        result: "Not Found",
        message: "Producto no encontrado",
      });
    let updateProduct = await productModel.updateOne({ _id: pId }, body);
    res.send({
      result: "Success, Product updated",
      payload: updateProduct,
    });
  } catch (error) {
    console.error("No se pudo actualizar el producto: " + error);
    res
      .status(500)
      .send({ error: "No se pudo actualizar el producto", message: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let pId = req.params.pid;
    if (!pId)
      return res.status(400).send({ error: "Datos requeridos no enviados" });
    let product = await productModel.find({ _id: pId });
    if (product.length === 0)
      return res.send({
        result: "Not Found",
        message: "Producto no encontrado",
      });
    let deleteProduct = await productModel.deleteOne({ _id: pId });
    res.send({ result: "Success, Producto borrado" });
  } catch (error) {
    console.error("No se pudo borrar el producto: " + error);
    res
      .status(500)
      .send({ error: "No se pudo borrar el producto", message: error });
  }
};
