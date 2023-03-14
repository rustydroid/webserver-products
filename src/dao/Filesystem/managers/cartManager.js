import Cart from "../objects/cart.js";
import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.encoding = "utf-8";
    this.path = "./carts.json";
    this.fileReaded = false;
  }

  printCarts = () => {
    console.log("Carritos: ", this.carts);
  };

  // Check if Product code already exist in array
  existCart = async (id) => {
    await this.readCarts();
    console.log("Entrando check exist");
    console.log("Carritos: ", this.carts);
    const checkExist = this.carts.some(function (cart) {
      return cart.id === id;
    });
    console.log("Check exist: ", checkExist);
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
  addCart = async (id) => {
    console.log("Listado de carritos Antes: ", this.carts);
    let exist = await this.existCart(id);
    console.log("exist: ", exist);
    if (!exist) {
      let newCart = new Cart(id, []);
      this.carts.push(newCart);
      console.log("Listado de carritos despues: ", this.carts);
    }
    console.log("EstadoCarrito: ", this.carts);
    await this.saveCarts();
  };

  updateCart = async (cid, pid, qty, pos) => {
    console.log("Carritos creados", this.carts);
    let cart = this.carts[pos];
    console.log("Carrito a editar: ", cart.products);
    // let productPosition = cart.products.findIndex((product) => product.pid === pid);
    let productPosition = cart.products.findIndex(
      (product) => product.pid === pid
    );
    console.log("Posicion: ", productPosition);
    if (productPosition < 0) {
      console.log("Producto no encontrado");
      console.log("Agregando producto");
      let newProduct = { pid: pid, quantity: qty };
      this.carts[pos].products.push(newProduct);
      console.log("Carritos Despues: ", this.carts[pos]);
    } else {
      console.log("Producto encontrado");
      console.log(cart.products[productPosition]);
      let oldQty = parseInt(cart.products[productPosition].quantity);
      this.carts[pos].products[productPosition].quantity = oldQty + qty;
      console.log("Carritos Despues: ", this.carts[pos]);
    }
    await this.saveCarts();
  };
}

export default CartManager;
