import { getAll } from "../api/post";

const NewList = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        <div class="py-3">
            <h2 class="font-bold uppercase mb-4 text-2xl">Tin Tức nổi bật</h2>
            <div class="grid grid-cols-3 gap-8">
            ${data.map((post) =>/* html */ `
                <div class="border-2 border-[#ccc] mx-auto py-[10px] px-[20px] w-full item-full">
                    <a href="/#/news/${post.id}"><img class="h-[250px] w-full" src="${post.img}" alt="" /></a>
                    <a href="/#/news/${post.id}">
                    <h4 class="text-orange-700 font-bold py-2">
                    ${post.title}
                    </h4>
                    </a>
                    <p class="text-xs">
                    ${post.desc}
                    </p>
                </div>
            `).join("")}
            </div>
        </div>
        <div class="py-3">
          <h2 class="font-bold uppercase mb-4 text-2xl">Hoạt Động sinh viên</h2>
          <div class="grid grid-cols-3 gap-8">
            ${data.map((post) =>/* html */ `
                <div class="border-2 border-[#ccc] mx-auto py-[10px] px-[20px] w-full item-full ">
                    <a  href="/#/news/${post.id}"><img class="h-[250px] w-full" src="${post.img}" alt="" /></a>
                    <a href="/#/news/${post.id}">
                    <h4 class="text-orange-700 font-bold py-2">
                    ${post.title}
                    </h4>
                    </a>
                    <p class="text-xs">
                    ${post.desc}
                    </p>
                </div>
            `).join("")}
            </div>
        </div>
        `;
    },
};
export default NewList;