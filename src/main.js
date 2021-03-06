import Navigo from "navigo";
import toastr from "toastr";
import AboutPage from "./pages/about";
import DashboardPage from "./pages/admin/dashboard";
import AdminNewsPage from "./pages/admin/news";
import AddNewsPage from "./pages/admin/news/add";
import EditNewPage from "./pages/admin/news/edit";
import DetailNewPage from "./pages/detailNew";
import HomePage from "./pages/home";
import NewsPage from "./pages/news";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import "toastr/build/toastr.min.css";
import ProductPage from "./pages/product";
import DetailProductPage from "./pages/product/detailProduct";
import CartPage from "./pages/cart/cart";
import AdminProductPage from "./pages/admin/product";
import AddProductPage from "./pages/admin/product/add";
import EditProductPage from "./pages/admin/product/edit";
import DetailCatePost from "./pages/detailCatePost";
import AdminCatePostPage from "./pages/admin/catePosts";
import AddCatePostPage from "./pages/admin/catePosts/add";
import EditCatePostPage from "./pages/admin/catePosts/edit";
import AdminCateProductPage from "./pages/admin/cateProducts";
import AddcateProductPage from "./pages/admin/cateProducts/add";
import EditCateProductPage from "./pages/admin/cateProducts/edit";
import DetailCateProduct from "./pages/detailCateProduct";

const router = new Navigo("/", { linksSelector: "a", hash: true });
const print = async (content, id) => {
    document.getElementById("app").innerHTML = await content.render(id);
    if (content.afterRender) content.afterRender(id);
};
router.on("/admin/*", () => {}, {
    before: (done) => {
        if (localStorage.getItem("user")) {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const userEmail = JSON.parse(localStorage.getItem("user")).email;
            // const userName = JSON.parse(localStorage.getItem("user")).username;
            if (userId === 1 && userEmail === "admin@gmail.com") {
                done();
            } else {
                toastr.warning("Ba??n kh??ng ????????c phe??p va??o trang Admin");
                document.location.href = "/#/";
            }
        } else {
            toastr.warning("Ba??n kh??ng ????????c phe??p va??o trang Admin");
            document.location.href = "/#/";
        }
    },
});
router.on({
    "/": () => print(HomePage),
    "/about": () => print(AboutPage),
    // product
    "/products": () => print(ProductPage),
    "/products/:id": ({ data }) => print(DetailProductPage, data.id),

    // new
    "/news": () => print(NewsPage),
    "/news/:id": ({ data }) => print(DetailNewPage, data.id),
    // catePost
    "/catePosts/:id": ({ data }) => print(DetailCatePost, data.id),
    // cateProducts
    "/cateProducts/:id": ({ data }) => print(DetailCateProduct, data.id),

    // signup signin
    "/signin": () => print(Signin),
    "/signup": () => print(Signup),
    // cart
    "/cart": () => print(CartPage),
    // admin
    "/admin/dashboard": () => print(DashboardPage),
    // admin new
    "/admin/news": () => print(AdminNewsPage),
    "/admin/news/add": () => print(AddNewsPage),
    "/admin/news/edit/:id": ({ data }) => print(EditNewPage, data.id),
    // admin product
    "/admin/products": () => print(AdminProductPage),
    "/admin/products/add": () => print(AddProductPage),
    "/admin/products/edit/:id": ({ data }) => print(EditProductPage, data.id),
    // admin catePost
    "/admin/catePosts": () => print(AdminCatePostPage),
    "/admin/catePosts/add": () => print(AddCatePostPage),
    "/admin/catePosts/edit/:id": ({ data }) => print(EditCatePostPage, data.id),
    // admin cateProduct
    "/admin/cateProducts": () => print(AdminCateProductPage),
    "/admin/cateProducts/add": () => print(AddcateProductPage),
    "/admin/cateProducts/edit/:id": ({ data }) => print(EditCateProductPage, data.id),

});
router.resolve();