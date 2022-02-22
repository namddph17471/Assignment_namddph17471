import instance from "./config";

export const add = (post) => {
    const url = "/cateProducts";
    return instance.post(url, post);
};
export const update = (post) => {
    const url = `/cateProducts/${post.id}`;
    return instance.put(url, post);
};
export const get = (id) => {
    const url = `cateProducts/${id}?_embed=products`;
    return instance.get(url);
};
export const getAll = () => {
    const url = "/cateProducts";
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/cateProducts/${id}`;
    return instance.delete(url);
};