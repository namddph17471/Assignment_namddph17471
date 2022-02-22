import toastr from "toastr";
import "toastr/build/toastr.min.css";

let cart = [];
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}
export const addToCart = (newProduct, next) => {
    const existProduct = cart.find((product) => product.id === newProduct.id);
    if (!existProduct) {
        cart.push(newProduct);
    } else {
        existProduct.quantity += +newProduct.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
};
export const increaseProduct = (id) => {
    cart.find((product) => product.id === +id).quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
};
export const decreaseProduct = (id) => {
    const currenProduct = cart.find((product) => product.id === +id);
    currenProduct.quantity--;
    // nếu sản phẩm giảm nhỏ hơn 1 thì xóa
    if (currenProduct.quantity < 1) {
        const confirm = window.confirm("Bạn có muốn xóa sản phẩm này không?");
        if (confirm) {
            cart = cart.filter((item) => item.id !== currenProduct.id);
        } else {
            currenProduct.quantity = 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
};
export const removeProduct = (id, next) => {
    const confirm = window.confirm("Bạn có muốn xóa sản phẩm này không?");
    if (confirm) {
        cart = cart.filter((item) => item.id !== +id);
        alert("bạn đã xóa thành công");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
};
export const removeCart = () => {
    const confirm = window.confirm("Bạn có muốn thanh toán không?");
    if (confirm) {
        for (let i = 0; i < cart.length; i++) {
            cart.splice(cart[i], cart.length);
        }
        localStorage.removeItem("cart");
        toastr.success("Bạn đã thanh toán thành công thành công");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
};