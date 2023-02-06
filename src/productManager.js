// Import Product definition
const Product = require("./product");
const fs = require("fs");

class ProductManager {
  #idControl;
  constructor() {
    this.#idControl = 0;
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
    await fs.promises.access(this.path, (err) => {
      if (err) {
        console.error("File don't exist");
        throw Error(`File don't exist on path provided ${this.path}`);
      }
    });
  };

  // Read products from file
  readProducts = async () => {
    if (!this.fileReaded) {
      try {
        await this.checkFileExist;
        let productsRead = await fs.promises.readFile(this.path, this.encoding);
        console.log("Products readed from JSON file");
        this.products = JSON.parse(productsRead);
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
  addProduct = async (title, desc, price, thumb, code, stock) => {
    if (!this.existProduct(code)) {
      let newProduct = new Product(
        this.#idControl,
        title,
        desc,
        price,
        thumb,
        code,
        stock
      );
      this.products.push(newProduct);
      this.#idControl++;
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
  getProductById = (id) => {
    fs.access(this.path, (err) => {
      if (err) throw Error("File productos no existe");
      else {
        fs.readFile(this.path, this.encoding, (err, content) => {
          if (err) throw Error("No se pudo leer el archivo");
          else {
            this.products = [];
            this.products = JSON.parse(content);
            const checkExist = this.products.some(function (product) {
              if (product.id === id) {
                console.log("Producto Encontrado");
                console.log(product);
              } else console.log("Producto Inexistente");
            });
          }
        });
      }
    });
  };
}

module.exports = ProductManager;
