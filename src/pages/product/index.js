import Banner from "../../components/banner";
import CategoryProduct from "../../components/cateProducts";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ProductList from "../../components/ProductList";

const ProductPage = {
    async render() {
        return /* html */`
        <div id ="header"> 
        ${Header.render()}
        </div>
        ${Banner.render()}
        <div class="">
            ${await CategoryProduct.render()}
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