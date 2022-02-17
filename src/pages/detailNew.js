import Header from "../components/header";
import Footer from "../components/footer";
import { get } from "../api/post";

const DetailNewPage = {
    async render(id) {
        const { data } = await get(id);

        return/* html */ `
        <div id ="header"> 
        ${Header.render()}
        </div>
        <div class="max-w-5xl mx-auto">
            <h1 class="font-bold uppercase mb-4 text-2xl">${data.title}</h1>
            <img src="${data.img}" />
            <p>${data.desc}</p>
        </div>
        ${Footer.render()}
        `;
    },
};
export default DetailNewPage;