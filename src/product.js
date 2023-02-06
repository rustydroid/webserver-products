class Product {
  constructor(id, title, desc, price, thumb, code, stock) {
    (this.id = id),
      (this.title = title),
      (this.description = desc),
      (this.price = price),
      (this.thumbnail = thumb),
      (this.code = code),
      (this.stock = stock);
  }
};

module.exports = Product;
