import Banner from "../components/banner";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductList from "../components/ProductList";

const HomePage = {
    async render() {
        return /* html */`
        
        <div id="header">
            ${Header.render()}
        </div>
            <div class="max-w-5xl mx-auto">
                <div class="banner">
                   ${Banner.render()}
                </div>
                <div class="news">
                    ${await ProductList.render()}
                </div>
            </div>
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default HomePage;