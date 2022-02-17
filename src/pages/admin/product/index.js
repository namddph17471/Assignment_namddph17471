import { getAll, remove } from "../../../api/product";
import Nav from "../../../components/nav";
import { reRender } from "../../../utils/rerender";

const AdminProductPage = {
    async render() {
        const { data } = await getAll();
        return /* html */ `
            ${Nav.render()}
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div class="lg:flex lg:items-center lg:justify-between">
                            <div class="flex-1 min-w-0">
                            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Quản lý tin tức
                            </h2>
                            </div>
                            <div class="mt-5 flex lg:mt-0 lg:ml-4">
                            <a href="/#/admin/products/add" class="sm:ml-3">
                                <button type="button"
                                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm mới
                                </button>
                            </a>
                            </div>
                        </div>
                        </div>
                  </header>
                    <main>
                        <div class="max-w-7xl mx-auto py-6 ">
                            <div class="px-4 py-3 sm:px-0">
                                <div class=" rounded-lg ">
                                    <div class="flex flex-col max-w-5xl mx-auto">
                                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                  <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50">
                                                      <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        STT
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Image
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Title
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                          Price
                                                        </th>
                                                        <th scope="col" class="relative px-6 py-3">
                                                          <span class="sr-only">Edit</span>
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody class="bg-white divide-y divide-gray-200">
                                                        ${data.map((post, index) =>/* html */ `
                                                        <tr>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${index + 1}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                              <div class="flex-shrink-0 h-10 w-10">
                                                                <img class="h-10 w-10 " src="${post.img}" alt="">
                                                              </div>
                                                            </div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${post.name}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="text-sm text-gray-900">${post.price}</div>
                                                          </td>
                                                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button class=" bg-indigo-600">
                                                            <a href="/#/admin/products/edit/${post.id}" class=" bg-indigo-900 text-white p-3 rounded  hover:text-white-900">Edit</a>
                                                            </button>
                                                            <button data-id="${post.id}" class="btn bg-red-500 text-white inline-block py-3 px-5 rounded  hover:text-indigo-900">Delete</button>
                                                          </td>
                                                        </tr>
                                                        `).join("")}
                                                    </tbody>
                                                  </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
        `;
    },
    afterRender() {
        // Lấy danh sách button
        const btns = document.querySelectorAll(".btn");
        // tạo vòng lặp và lấy ra từng button
        btns.forEach((btn) => {
            const { id } = btn.dataset;
            // Viết sự kiện khi click vào button call api và xóa sản phẩm
            btn.addEventListener("click", () => {
                const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
                if (confirm) {
                    remove(id).then(() => {
                        alert("Bạn đã xóa thành công");
                        reRender(AdminProductPage, "#app");
                    });
                }
            });
        });
    },
};
export default AdminProductPage;