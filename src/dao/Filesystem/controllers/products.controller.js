// Import ProductManager for filesystem
import ProductManager from '../managers/productManager.js';

// Create new instance of ProductManager
let productManager = new ProductManager();
productManager.checkFileExist();

// Export Functions
export const getProducts = async (request, response) => {
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
};

export const getProductById = async (request, response) => {
  let pId = parseInt(request.params.pid);
  let product = await productManager.getProductById(pId);
  if (product === null) {
    return response
      .status(404)
      .send({ status: "info", message: "Producto no encontrado" });
  }
  console.log("Producto encontrado: ", product);
  return response.send({
    status: "Success",
    message: "Producto Encontrado.",
    data: product,
  });
};

export const createProduct = async (request, response) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    request.body;
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
};

export const updateProductById = async (request, response) => {
  let body = request.body;
  let pId = parseInt(request.params.pid);
  let product = await productManager.getProductById(pId);
  if (product === null) {
    return response
      .status(404)
      .send({ status: "info", message: "Producto no encontrado" });
  }
  await productManager.updateProduct(pId, body);
  return response.send({
    status: "Success",
    message: "Producto Actualizado.",
  });
};

export const deleteProduct = async (request, response) => {
  let pId = parseInt(request.params.pid);
  let product = await productManager.getProductById(pId);
  if (product === null) {
    return response
      .status(404)
      .send({ status: "info", message: "Producto no encontrado" });
  }
  await productManager.deleteProduct(pId);
  return response.send({
    status: "Success",
    message: "Producto Borrado.",
  });
};
