import instance from "./config";

export const add = (post) => {
    const url = "/products";
    return instance.post(url, post);
};
export const update = (post) => {
    const url = `/products/${post.id}`;
    return instance.put(url, post);
};
export const get = (id) => {
    const url = `/products/${id}`;
    return instance.get(url);
};
export const getAll = () => {
    const url = "/products";
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/products/${id}`;
    return instance.delete(url);
};