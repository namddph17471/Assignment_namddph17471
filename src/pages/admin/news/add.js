import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation";
import { getAll } from "../../../api/catePost";
import { add } from "../../../api/post";
import Nav from "../../../components/nav";

const AddNewsPage = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        ${Nav.render()}
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Thêm mới tin tức
                    </h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <form action="" id="form-add-post">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Tiêu đề
                                    </label>
                                    <div class="mt-1">
                                        <input id="title" name="title" type="text"   class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                        Danh mục
                                    </label>
                            
                                    <select id="catePostId"  class="mt-1 p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded">
                                        <option   class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded"></option>
                                    ${data.map((post) =>/* html */ `
                                        <option value="${post.id}"  class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded">${post.title}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                <label class="block text-sm font-medium text-gray-700">
                                  Ảnh
                                </label>
                                <div class="space-y-1 text-center">
                                    <input name="img" id="file-upload" type="file"  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" >
                                </div>
                              <img id="img-preview" src="https://res.cloudinary.com/namddph17471/image/upload/v1645490263/no-thumbnail-medium-16315289445371324098298-0-0-620-992-crop-16315296413801134506614_vc8xjb.png" />
                                
                            </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Nội dung
                                    </label>
                                    <div class="mt-1">
                                      <textarea id="desc" name="desc" rows="3" class=" p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 flex lg:mt-0 lg:ml-4">
                                  <button type="submit"
                                  class=" btn m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Thêm mới tin tức
                                  </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </main> 
        `;
    },
    afterRender() {
        const formAdd = $("#form-add-post");
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
                title: {
                    required: true,
                    minlength: 5,
                },
                desc: {
                    required: true,
                    minlength: 5,

                },
                img: {
                    required: true,
                },
            },
            messages: {
                title: {
                    required: "Không để trống trường này!",
                    minlength: "Ít nhất phải trên 5 ký tự",
                },
                desc: {
                    required: "Không để trống trường này!",
                    minlength: "Ít nhất phải trên 5 ký tự",
                },
                img: {
                    required: "Không để trống trường này!",
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
                    add(
                        {
                            title: document.querySelector("#title").value,
                            img: imgLink || "",
                            desc: document.querySelector("#desc").value,
                            catePostId: +document.querySelector("#catePostId").value,
                        },
                    ).then(() => {
                        window.location.href = "/#/admin/news";
                        alert("Bạn đã thêm  thành công");
                    });
                }
                handleAddPost();
            },
        });
    },
};

export default AddNewsPage;