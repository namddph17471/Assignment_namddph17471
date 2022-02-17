import axios from "axios";
import { add } from "../../../api/post";
import Nav from "../../../components/nav";

const AddNewsPage = {
    async render() {
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
                                        <input id="title" type="text"   class="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 py-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="">
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
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Nội dung
                                    </label>
                                    <div class="mt-1">
                                      <textarea id="desc" name="about" rows="3" class=" p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" ></textarea>
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
        const formAdd = document.querySelector("#form-add-post");
        const imgPost = document.querySelector("#file-upload");
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/namddph17471/image/upload";
        const CLOUDINARY_PRESET = "nw9blvdh";
        formAdd.addEventListener("submit", async (e) => {
            e.preventDefault();
            const file = imgPost.files[0];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);

            const respone = await axios.post(CLOUDINARY_API, formData, {
                headers: {
                    "Content-Type": "application/form-data",
                },
            });
            add(
                {
                    title: document.querySelector("#title").value,
                    img: respone.data.url,
                    desc: document.querySelector("#desc").value,
                },
            ).then(() => {
                window.location.href = "/#/admin/news";
                alert("Bạn đã thêm  thành công");
            });
        });
    },
};

export default AddNewsPage;