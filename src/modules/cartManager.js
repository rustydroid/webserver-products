import Cart from "./cart.js";
import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.encoding = "utf-8";
    this.path = "./carts.json";
    this.fileReaded = false;
  }

  // Check if Product code already exist in array
  existCart = async (id) => {
    await this.readCarts();
    const checkExist = this.carts.some(function (cart) {
      return cart.id === id;
    });
    return checkExist;
  };

  // Check if products.json exist
  checkFileExist = () => {
    fs.access(this.path, (err) => {
      if (err) {
        console.error("File don't exist, creating file");
        this.saveCarts();
        // throw Error(`File don't exist on path provided ${this.path}`);
      }
    });
  };

  // Save products to file
  saveCarts = async () => {
    try {
      // this.checkDirExist();
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts),
        (err) => {
          if (err) {
            console.error(`Error saving carts on file: ${this.path}, ${err}`);
            throw Error(`Error saving carts on file: ${this.path}, ${err}`);
          }
        }
      );
      console.log("Carts saved on file!!");
    } catch (error) {
      console.log(error);
    }
  };

  // Read products from file
  readCarts = async () => {
    if (!this.fileReaded) {
      try {
        await this.checkFileExist();
        let cartsRead = await fs.promises.readFile(
          this.path,
          this.encoding,
          (err, data) => {
            if (err)
              console.error(
                `Error reading carts from file: ${this.path}, ${err}`
              );
            // console.log(data);
          }
        );
        console.log("Carts readed from JSON file");
        this.carts = JSON.parse(cartsRead);
        console.log(this.carts);
        this.fileReaded = true;
      } catch (error) {
        console.error(`Error reading carts from file: ${this.path}, ${error}`);
        throw Error(`Error reading carts from file: ${this.path}, ${error}`);
      }
    }
    return this.carts;
  };

  // Add a product checking if the code exist or not
  addProduct = async (id, products) => {
    console.log("Listado de carritos Antes: ", this.carts);
    if (!this.existCart(id)) {
      await this.readCarts();
      let newCart = new Cart(id, products);
      this.carts.push(newCart);
      console.log("Listado de carritos despues: ", this.carts);
    }
    await this.saveCarts();
  };
}

export default CartManager;
