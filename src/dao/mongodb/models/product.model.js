import { model, Schema } from "mongoose";

const productCollection = "products";

const typeString = {
  type: String,
  require: true,
};
const typeNumber = {
  type: Number,
  require: true,
};
const typeArray = {
  type: Array,
  require: true,
};

const productSchema = new Schema({
  title: typeString,
  description: typeString,
  code: String,
  price: typeNumber,
  status: {
    type: Boolean,
    require: true,
  },
  stock: typeNumber,
  category: typeArray,
  thumbnail: typeArray,
});

export const productModel = model(productCollection, productSchema);