import Header from "../components/header";
import Footer from "../components/footer";
import { get } from "../api/post";
import Banner from "../components/banner";

const DetailNewPage = {
    async render(id) {
        const { data } = await get(id);
        return/* html */ `
        <div id ="header"> 
        ${Header.render()}
        </div>
        ${Banner.render()}
        <div class=" mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div class="mt-2  mx-auto sm:px-6  lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">${data.title}</h1>
                </div>
              <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img src="${data.img}" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-center object-cover">
              </div>
              
              <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                <p>${data.desc}</p>
              </div>
            </div>
            <div class="mt-4 lg:mt-0 lg:row-span-3">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Bài viết liên quan</h1>
                </div>
            </div>
        </div>
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default DetailNewPage;