import NewList from "../components/NewList";
import Footer from "../components/footer";
import Header from "../components/header";
import Banner from "../components/banner";

const NewsPage = {
    async render() {
        return /* html */`
        <div id ="header"> 
        ${Header.render()}
        </div>
        ${Banner.render()}
            ${await NewList.render()}
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default NewsPage;