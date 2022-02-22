import axios from "axios";
import { get, update } from "../../../api/cateProduct";
import Nav from "../../../components/nav";

const EditCateProductPage = {
    async render(id) {
        const { data } = await get(id);
        return /* html */`
        ${Nav.render()}
            <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div class="lg:flex lg:items-center lg:justify-between">
                            <div class="flex-1 min-w-0">
                                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                    Quản lý Loại Hàng
                                </h2>
                            </div>
                        </div>
                    </div>
            </header>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <form action=""  id="form-edit">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Tên Loại Hàng
                                    </label>
                                    <div class="mt-1">
                                        <input id="title" type="text" value="${data.name}"  class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                <div>
                                <label class="block text-sm font-medium text-gray-700">
                                  Ảnh
                                </label>
                                <div class="space-y-1 text-center">
                                <input id="file-upload" type="file"  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" >
                                </div>
                            </div>
                              <img src="${data.img}" />
                            </div>
                            <div class="mt-5 flex lg:mt-0 lg:ml-4">
                                  <button type="submit"
                                  class=" btn m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Cập Nhật
                                  </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },
    afterRender(id) {
        const formEdit = document.querySelector("#form-edit");
        const imgPost = document.querySelector("#file-upload");
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/namddph17471/image/upload";
        const CLOUDINARY_PRESET = "nw9blvdh";
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (imgPost.value === "") {
                const { data } = await get(id);
                update({
                    id,
                    title: document.querySelector("#name").value,
                    img: data.img,
                }).then(() => {
                    alert("Bạn đã sửa  thành công");
                    document.location.href = "/#/admin/cateProducts";
                });
            }
            const file = imgPost.files[0];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);
            const respone = await axios.post(CLOUDINARY_API, formData, {
                headers: {
                    "Content-Type": "application/form-data",
                },
            });
            update({
                id,
                title: document.querySelector("#name").value,
                img: respone.data.url,
            }).then(() => {
                alert("Bạn đã sửa  thành công");
                document.location.href = "/#/admin/cateProducts";
            });
        });
    },
};
export default EditCateProductPage;