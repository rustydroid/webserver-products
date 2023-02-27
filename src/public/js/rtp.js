const socket = io();

const title = document.getElementById("flotating_title");
const desc = document.getElementById("floating_description");
const code = document.getElementById("floating_code");
const price = document.getElementById("floating_price");
const statusProd = document.getElementById("floating_status");
const stock = document.getElementById("floating_stock");
const category = document.getElementById("floating_category");
const thumbnails = document.getElementById("floating_thumb");
const button = document.getElementById("button_create");
const tableBody = document.getElementById("tableBody");

button.addEventListener("click", () => {
  productValues = {
    title: title.value,
    description: desc.value,
    code: code.value,
    price: price.value,
    statusProd: statusProd.value,
    stock: stock.value,
    category: category.value,
    thumbnails: thumbnails.value,
  };
  socket.emit("new_product", productValues);
});

socket.on("get_products", (products) => {
  let prods = "";
  products.forEach((product) => {
    prods += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >${product.title} </th>
            <td class="px-6 py-4">${product.description} </td>
            <td class="px-6 py-4">${product.code} </td>
            <td class="px-6 py-4">$${product.price} </td>
            <td class="px-6 py-4">${product.status} </td>
            <td class="px-6 py-4">${product.stock} </td>
            <td class="px-6 py-4">${product.category} </td>
            <td class="px-6 py-4">${product.thumbnail} </td>
            </tr>`;
  });
  tableBody.innerHTML = prods;
});

