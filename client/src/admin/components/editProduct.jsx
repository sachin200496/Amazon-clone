import {useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import ProductForm from "./productForm";
import { getProductById,updateProduct } from "../api/adminProducts";

export default function EditProducts(){
const {id} = useParams();
const navigate = useNavigate();
const [product, setProduct] = useState(null);

useEffect(() =>{
    getProductById(id).then(setProduct);
},[id]);

const handleUpdate = async (data) =>{
   await updateProduct(id, data);
   navigate("/admin/products")
}

return(
    <ProductForm 
    title="Edit Product"
    initialValues={product}
    onSubmit={handleUpdate}
    />
)
}