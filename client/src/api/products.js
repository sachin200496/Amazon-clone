import api from './axios.js';
import {products} from "../mock/products.js"


export const getProducts = async () =>{
//     const {data} = await api.get("/products");
//     return data;

return products
}

export const getProductsById = async (id) =>{
    const {data} = await api.get(`/products/${id}`);
    return data
}