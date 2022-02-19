import toastr from "toastr";
import { reRender } from "../utils/rerender";
import "toastr/build/toastr.min.css";

const Header = {
    render() {
        return/* html */ `
          <div class="relative bg-white">
            <div class=" px-4 py-5 sm:px-6">
                <div class="flex justify-between items-center border-b-2 border-gray-100 py-1 ">
                <nav class=" md:flex space-x-10">
                  <div class="relative">
                      <a href="/#/" class="text-base font-medium text-gray-500 hover:text-gray-900"> Trang chủ </a>
                  </div>
          
                  <a href="/#/news" class="text-base font-medium text-gray-500 hover:text-gray-900"> Tin Tức </a>
                  <a href="/#/products" class="text-base font-medium text-gray-500 hover:text-gray-900"> Sản phẩm </a>
                  <div class="relative">
                      <a href="/#/about" class="text-base font-medium text-gray-500 hover:text-gray-900"> Thông tin </a>
                  </div>
                  <a href="/#/cart" id="cart" class="text-base font-medium text-gray-500 hover:text-gray-900">
                    <img class="h-[30px] w-auto " src="https://res.cloudinary.com/namddph17471/image/upload/v1645069905/add_to_cart_cart_shopping_cart_shopping_cart_icon_icon-1320073116171330767_xybur6.png" alt="">
                  </a>
                </nav>
                ${localStorage.getItem("user") ?/* html */ `
                  <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <ul class="flex  items-center px-3">
                      <li class="flex items-center ">Xin chào <span id="account_username" class=" font-medium block px-4 py-3 text-gray-500"></span></li>
                      <li type="button" id="logout" class="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700">Logout</li>
                    </ul>
                  </div>
                  ` :/* html */ `
                  <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <a href="/#/signin" class="cursor-pointer whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Sign in </a>
                    <a href="/#/signup" class="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign up </a>
                  </div>
              `}
                
              </div>
            </div>
          </div>
      
        `;
    },
    afterRender() {
        const accountUserName = document.querySelector("#account_username");
        if (accountUserName) {
            accountUserName.innerHTML = JSON.parse(localStorage.getItem("user")).username;
        }
        // const cart = $("#cart");
        const logout = document.querySelector("#logout");
        if (logout) {
            logout.addEventListener("click", () => {
                const confirm = window.confirm("Đại hiệp có chắc chắn muốn rời khỏi ?");
                if (confirm) {
                    localStorage.removeItem("user");
                    toastr.success("Bạn đã đăng xuất thành công");
                    reRender(Header, "#header");
                }
            });
        }
    },
};
export default Header;