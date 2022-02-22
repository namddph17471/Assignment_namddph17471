import axios from "axios";
import { getAll } from "../../../api/cateProduct";
import { get, update } from "../../../api/product";
import Nav from "../../../components/nav";

const EditProductPage = {
    async render(id) {
        const { data } = await get(id);
        const categoriesProduct = await getAll();
        console.log(categoriesProduct.data);
        return /* html */`
        ${Nav.render()}
            <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div class="lg:flex lg:items-center lg:justify-between">
                            <div class="flex-1 min-w-0">
                                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                    Quản lý Sản phẩm
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
                                      Tên
                                    </label>
                                    <div class="mt-1">
                                        <input id="name" type="text" value="${data.name}"  class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                        Loại Hàng
                                    </label>
                            
                                    <select id="cateProductId"  class="mt-1 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded">
                                    ${categoriesProduct.data.map((post) =>/* html */ `
                                        <option value="${post.id}"  class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded">${post.name}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                <label class="block text-sm font-medium text-gray-700">
                                  Ảnh
                                </label>
                                <div class="space-y-1 text-center">
                                <input id="file-upload" type="file"  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" >
                                </div>
                            </div>
                              <img id="img-preview" src="${data.img}" />
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Giá
                                    </label>
                                    <div class="mt-1">
                                    <input id="price" type="text" value="${data.price}"  class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Số Lượng
                                    </label>
                                    <div class="mt-1">
                                    <input id="quantity" value="${data.quantity}" type="text" class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Nội dung
                                    </label>
                                    <div class="mt-1">
                                      <textarea id="desc" name="about" rows="3" class=" p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" >${data.desc}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 flex lg:mt-0 lg:ml-4">
                                  <button type="submit"
                                  class=" m-3 btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
        const imgPreview = document.querySelector("#img-preview");
        const imgPost = document.querySelector("#file-upload");
        let imgLink = "";
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/namddph17471/image/upload";
        const CLOUDINARY_PRESET = "nw9blvdh";
        imgPost.addEventListener("change", (e) => {
            imgPreview.src = URL.createObjectURL(e.target.files[0]);
        });
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            const file = document.querySelector("#file-upload").files[0];
            if (file) {
                // Gắn vào đối tượng formData
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);

                // call api cloudinary, để upload ảnh lên
                const { data } = await axios.post(CLOUDINARY_API, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                imgLink = data.url;
            }
            update({
                id,
                name: document.querySelector("#name").value,
                img: imgLink || imgPreview.src,
                desc: document.querySelector("#desc").value,
                price: +document.querySelector("#price").value,
                quantity: +document.querySelector("#quantity").value,
                cateProductId: +document.querySelector("#cateProductId").value,
            });
            alert("Bạn đã sửa  thành công");
            document.location.href = "/#/admin/products";
        });
    },
};
export default EditProductPage;