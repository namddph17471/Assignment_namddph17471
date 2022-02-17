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
            <div class=" mx-auto">
                   ${Banner.render()}
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