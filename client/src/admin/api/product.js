import api from "../../api/axios.js";


export const createProduct = async (formData) =>{
    const {data} = await api.post("/products", formData);
    return data;
}


export const getProducts = async ()=>{
    const {data} = await api.get("/products");
    return data;
}

export const getProductById = async (id) =>{
    const {data} = await api.get(`/products/${id}`);
    return data;
}

export const updateProduct = async (id, formData) =>{
    const {data} = await api.put(`/products/${id}`, formData);
    return data;
}