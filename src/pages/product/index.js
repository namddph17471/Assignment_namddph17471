import Footer from "../../components/footer";
import Header from "../../components/header";
import ProductList from "../../components/ProductList";

const ProductPage = {
    async render() {
        return `
        <div id ="header"> 
        ${Header.render()}
        </div>
            ${await ProductList.render()}
        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default ProductPage;