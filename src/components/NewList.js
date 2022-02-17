import { getAll } from "../api/post";

const NewList = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        <div class="bg-white">
          <div class=" mx-auto py-16 px-4 sm:py-12 sm:px-6  lg:px-8">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 m-3">Tin tức</h2>
            <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            ${data.map((post) =>/* html */ `
              <a href="/#/news/${post.id}" class="group">
                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img src="${post.img}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-[250px] object-center object-cover group-hover:opacity-75">
                </div>
                <h3 class="mt-1 text-lg font-medium text-gray-900">${post.title}</h3>
              </a>
              `).join("")}
            </div>
          </div>
        </div>
        `;
    },
};
export default NewList;