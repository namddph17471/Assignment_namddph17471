import { getAll } from "../api/cateProduct";

const CategoryProduct = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        
        <div class="bg-white-100">
          <div class=" mx-auto px-2 sm:px-3 lg:px-4">
            <div class="max-w-2xl mx-auto py-16 sm:py-6 lg:py-6 lg:max-w-none">
              <h2 class="text-2xl font-extrabold text-gray-900">Loại Hàng</h2>
              <div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              ${data.map((post) =>/* html */ `
                <div class="group relative">
                  <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <a href="/#/cateProducts/${post.id}?_embed=products">
                      <img src="${post.img}" alt="" class="w-full  object-center object-cover">
                    </a>
                  </div>
                  <h3 class="text-center mt-6 text-xl text-gray-500">
                    <a href="/#/catePosts/${post.id}?_embed=posts">
                      <p class=" font-semibold text-gray-900">${post.name}</p>
                    </a>
                  </h3>
                </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
        `;
    },
};
export default CategoryProduct;