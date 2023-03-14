import { model, Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: Array
})

export const cartModel = model(cartCollection, cartSchema);