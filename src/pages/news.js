import NewList from "../components/NewList";
import Footer from "../components/footer";
import Header from "../components/header";

const NewsPage = {
    async render() {
        return /* html */`
        <div id ="header"> 
        ${Header.render()}
        </div>
            ${await NewList.render()}
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default NewsPage;