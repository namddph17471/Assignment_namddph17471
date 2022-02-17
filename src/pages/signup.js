import toastr from "toastr";
import Header from "../components/header";
import Footer from "../components/footer";
import "toastr/build/toastr.min.css";
import { signup } from "../api/user";

const Signup = {
    render() {
        return /* html */ `
        <div id ="header"> 
          ${Header.render()}
        </div>
            <h1 class="font-bold uppercase mb-4 text-2xl my-8 text-center text-indigo-600">Đăng Ký Tài Khoản</h1>
            <div class="min-h-full flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">

                  <form class="mt-8 space-y-6" action="" id="form-signup">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm -space-y-px">
                      <div class="my-4 py-2">
                        <label class="font-medium text-indigo-600 hover:text-indigo-500" for="email-address" >Email address</label>
                        <input id="email"  name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
                      </div>
                      <div class="my-4 py-2">
                        <label class="font-medium text-indigo-600 hover:text-indigo-500" for="email-address" >User Name</label>
                        <input id="user_name"  name="user_name" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="User Name">
                      </div>
                      <div class="my-4 py-2">
                        <label class="font-medium text-indigo-600 hover:text-indigo-500" for="password" > Password</label>
                        <input id="password"  name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder=" Password">
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                    <div class="text-sm">
                    <p>
                    Bạn đã có tài khoản?
                    <a href="/#/signin" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Đăng Nhập
                    </a>
                    </p>
                    </div>
                    </div>

                    <div>

                      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                          <!-- Heroicon name: solid/lock-closed -->
                          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                          </svg>
                        </span>
                        Đăng Ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          ${Footer.render()}
        `;
    },
    afterRender() {
        const formSignup = document.querySelector("#form-signup");
        formSignup.addEventListener("submit", async (e) => {
            e.preventDefault();
            // signup({
            //     username: document.querySelector("#user_name").value,
            //     email: document.querySelector("#email").value,
            //     password: document.querySelector("#password").value,
            // }).then(() => {
            //     alert("Bạn đã đăng ký thành công");
            //     window.location.href = "/#/";
            // });
            try {
                const { data } = await signup({
                    username: document.querySelector("#user_name").value,
                    email: document.querySelector("#email").value,
                    password: document.querySelector("#password").value,
                });
                localStorage.setItem("user", JSON.stringify(data.user));
                toastr.success("Đăng ký thành công");
                document.location.href = "/#/signin";
            } catch (error) {
                toastr.error(error.response.data);
            }
        });
        Header.afterRender();
    },
};
export default Signup;