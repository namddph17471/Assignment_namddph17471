import toastr from "toastr";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { $ } from "../../utils";
import {
    decreaseProduct, increaseProduct, removeCart, removeProduct,
} from "../../utils/cart";
import "toastr/build/toastr.min.css";
import { reRender } from "../../utils/rerender";

const CartPage = {
    async render() {
        if (!localStorage.getItem("cart")) {
            toastr.warning("Giỏ hàng trống");
            document.location.href = "/#/";
        }
        const cart = JSON.parse(localStorage.getItem("cart"));
        let total = 0;
        cart.forEach((product) => {
            total += product.quantity * product.price;
        });
        return /* html */ `
                <div id ="header"> 
                  ${Header.render()}
                </div>
                ${Banner.render()}
                    <main>
                        <div class="max-w-7xl mx-auto py-6 ">
                            <div class="px-4 py-3 sm:px-0">
                                <div class=" rounded-lg ">
                                    <div class="flex flex-col max-w-5xl mx-auto">
                                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                  <table id="tb-cart" class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50 text-center">
                                                      <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        STT
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Image
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Quantity
                                                        </th>
                                                        <th scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Price
                                                        </th>
                                                        <th scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Total
                                                        </th>
                                                        <th scope="col" class="relative px-6 py-3">
                                                          <span class="sr-only">Edit</span>
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody class="bg-white divide-y divide-gray-200">
                                                        ${cart.map((product, index) =>/* html */ `
                                                        <tr>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${index + 1}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                              <div class="flex-shrink-0 h-10 w-10">
                                                                <img class="h-10 w-10 " src="${product.img}" alt="">
                                                              </div>
                                                            </div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${product.name}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap text-center">
                                                            <button data-id="${product.id}" class="btn  decrease bg-red-500 text-white inline-block py-1 px-2 rounded  hover:text-indigo-900">-</button>
                                                            <span class="text-sm text-gray-900 text-center">${product.quantity}</span>
                                                            <button data-id="${product.id}" class="btn increase bg-green-500 text-white inline-block py-1 px-2 rounded  hover:text-indigo-900">+</button>
                                                          </td>
                                                          <td class="px-6 text-center py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${product.price}</div>
                                                          </td>
                                                          <td class="px-6 text-center py-4 whitespace-nowrap">
                                                            <div  class=" text-sm text-gray-900">${product.price * product.quantity}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button data-id="${product.id}" class="btn remove bg-red-500 text-white inline-block py-3 px-5 rounded  hover:text-indigo-900">Remove</button>
                                                          </td>
                                                        </tr>
                                              

                                                        `).join("")}
                                                    </tbody>
                                                    <tfoot class="">
                                                      <td colspan="4" class="text-center">Total</td>
                                                      <td colspan="3" class="text-center pr-[70px]" id="total">${total}</td>
                                                    </tfoot>
                                                  </table>
                                                  </div>
                                                  <button type="submit" class="btn mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="btnAddToCart">Check out</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    ${Footer.render()}
        `;
    },
    afterRender() {
        const btns = $(".btn");
        btns.forEach((btn) => {
            const { id } = btn.dataset;
            btn.addEventListener("click", () => {
                if (btn.classList.contains("increase")) {
                    increaseProduct(id);
                    reRender(CartPage, "#app");
                } else if (btn.classList.contains("decrease")) {
                    decreaseProduct(id);
                    reRender(CartPage, "#app");
                } else if (btn.classList.contains("remove")) {
                    removeProduct(id, () => {
                        reRender(CartPage, "#app");
                    });
                } else {
                    removeCart();
                    localStorage.removeItem("cart");
                    document.location.href = "/#/";
                }
            });
        });
        Header.afterRender();
    },
};
export default CartPage;