import instance from "./config";

export const add = (post) => {
    const url = "/catePosts";
    return instance.post(url, post);
};
export const update = (post) => {
    const url = `/catePosts/${post.id}`;
    return instance.put(url, post);
};
export const get = (id) => {
    const url = `catePosts/${id}?_embed=posts`;
    return instance.get(url);
};
export const getAll = () => {
    const url = "/catePosts";
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/catePosts/${id}`;
    return instance.delete(url);
};