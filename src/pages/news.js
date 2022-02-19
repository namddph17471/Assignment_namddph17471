import NewList from "../components/NewList";
import Footer from "../components/footer";
import Header from "../components/header";
import Banner from "../components/banner";
import CategoryPost from "../components/catePosts";

const NewsPage = {
    async render() {
        return /* html */`
        <div id ="header"> 
        ${Header.render()}
        </div>
        ${Banner.render()}
        <div class="">
            ${await CategoryPost.render()}
        </div>
        <div>
            ${await NewList.render()}
        </div>
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default NewsPage;