// Import Product definition
import Product from "./product.js";
import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.encoding = "utf-8";
    this.pathDir = "./db";
    this.path = "./products.json";
    this.fileReaded = false;
  }

  // Check if Product code already exist in array
  existProduct = (code) => {
    const checkExist = this.products.some(function (product) {
      return product.code === code;
    });
    return checkExist;
  };

  // Check if products.json exist
  checkFileExist = async () => {
    await fs.access(this.path, (err) => {
      if (err) {
        console.error("File don't exist, creating file");
        this.saveProducts();
        // throw Error(`File don't exist on path provided ${this.path}`);
      }
    });
  };

  // Read products from file
  readProducts = async () => {
    if (!this.fileReaded) {
      try {
        await this.checkFileExist();
        let productsRead = await fs.promises.readFile(
          this.path,
          this.encoding,
          (err, data) => {
            if (err)
              console.error(
                `Error reading products from file: ${this.path}, ${error}`
              );
            // console.log(data);
          }
        );
        console.log("Products readed from JSON file");
        this.products = JSON.parse(productsRead);
        console.log(this.products);
        this.fileReaded = true;
      } catch (error) {
        console.error(
          `Error reading products from file: ${this.path}, ${error}`
        );
        throw Error(`Error reading products from file: ${this.path}, ${error}`);
      }
    }
  };

  returnProducts = async () => {
    await this.readProducts();
    // console.log(this.products)
    return this.products;
  };

  // Save products to file
  saveProducts = async () => {
    try {
      // this.checkDirExist();
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products),
        (err) => {
          if (err) {
            console.error(
              `Error saving products on file: ${this.path}, ${error}`
            );
            throw Error(
              `Error saving products on file: ${this.path}, ${error}`
            );
          }
        }
      );
      console.log("Products saved on file!!");
    } catch (error) {
      console.log(error);
    }
  };

  // Add a product checking if the code exist or not
  addProduct = async (id,title,desc,code,price,status,stock,category,thumb) => {
    console.log("Listado de productos Antes: ", this.products);
    if (!this.existProduct(code)) {
      await this.readProducts();
      
      let newProduct = new Product(
        id,
        title,
        desc,
        code,
        price,
        status,
        stock,
        category,
        thumb
      );
      this.products.push(newProduct);
      console.log("Listado de productos despues: ", this.products);
    }
    await this.saveProducts();
  };

  // Update product by Id
  updateProduct = async (id, productUpdate) => {
    await this.readProducts();
    console.log("Funcion update Product");
    const parseUpdate = this.products.map((product) => {
      if (product.id === id) return { ...product, ...productUpdate };
      else return product;
    });
    this.products = parseUpdate;
    console.log("Objetos actualizados");
    await this.saveProducts();
  };

  // Return all products in array
  getProducts = async () => {
    await this.readProducts();
    console.log("List of All products");
    console.log("========================");
    console.log(this.products);
  };

  // Delete product by id
  deleteProduct = async (id) => {
    await this.readProducts();
    const productsFiltered = this.products.filter((product) => {
      if (product.id !== id) return product;
    });
    this.products = productsFiltered;
    await this.saveProducts();
  };

  // Search if Product id exist in array, if not return a message
  getProductById = async (id) => {
    await this.readProducts();
    let prod = null;
    let found = this.products.some((product) => {
      if (product.id === id) {
        console.log("Producto Encontrado");
        prod = product;
      } else {
        console.log("Producto NO Encontrado");
      }
    });
    return prod;
  };
}

export default ProductManager;
