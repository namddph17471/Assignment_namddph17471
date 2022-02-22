import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation";
import { get, update } from "../../../api/catePost";
import Nav from "../../../components/nav";

const EditCatePost = {
    async render(id) {
        const { data } = await get(id);
        return /* html */`
        ${Nav.render()}
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Thêm mới Loại Hàng
                    </h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <form action="" id="form-add-cateProduct">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Tên Loại Hàng
                                    </label>
                                    <div class="mt-1">
                                        <input name="name" value="${data.title}" id="name" type="text"   class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                
                                <div>
                                <label class="block text-sm font-medium text-gray-700">
                                  Ảnh
                                </label>
                                <div class="space-y-1 text-center">
                                    <input name="img" id="file-upload" type="file"  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" >
                                </div>
                              <img id="img-preview" src="${data.img}" />

                            </div>
                                
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
            </main> 
        `;
    },
    afterRender(id) {
        const formAdd = $("#form-add-cateProduct");
        const imgPreview = document.querySelector("#img-preview");
        const imgPost = document.querySelector("#file-upload");
        let imgLink = "";

        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/namddph17471/image/upload";
        const CLOUDINARY_PRESET = "nw9blvdh";
        imgPost.addEventListener("change", (e) => {
            imgPreview.src = URL.createObjectURL(e.target.files[0]);
        });
        formAdd.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5,
                },
                img: {
                },
            },
            messages: {
                name: {
                    required: "Không để trống trường này!",
                    minlength: "Ít nhất phải trên 5 ký tự",
                },
                img: {
                },
            },
            submitHandler: () => {
                async function handleAddPost() {
                    // Lấy giá trị của input file
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
                        title: document.querySelector("#name").value,
                        img: imgLink || imgPreview.src,
                    });
                    alert("Bạn đã sửa  thành công");
                    document.location.href = "/#/admin/catePosts";
                }
                handleAddPost();
            },
        });
    },
};

export default EditCatePost;