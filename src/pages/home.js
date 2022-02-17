import Banner from "../components/banner";
import NewList from "../components/NewList";
import Header from "../components/header";
import Footer from "../components/footer";

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
                    ${await NewList.render()}
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