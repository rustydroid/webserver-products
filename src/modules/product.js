class Product {
  constructor(id, title, desc,code, price, status, stock, category, thumb) {
    (this.id = id),
      (this.title = title),
      (this.description = desc),
      (this.code = code),
      (this.price = price),
      (this.status = status),
      (this.stock = stock);
      (this.category = category),
      (this.thumbnail = thumb)
  }
};

export default Product;
