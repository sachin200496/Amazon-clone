import ProductForm from "./productForm";
import { createProduct } from "../api/product.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddProduct(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleAdd = async (data) => {
        try {
            setLoading(true);
            console.log("Adding product with data:", data);
            await createProduct(data);
            console.log("Product created successfully");
            navigate("/admin/products");
        } catch (err) {
            console.error("Error creating product:", err);
            alert(err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    }

    return(
        <ProductForm
            title="Add New Product"
            initialValues={{
                name:"",
                price:"",
                stock:"",
                category:"",
                image:"",
                description:""
            }}   
            onSubmit={handleAdd}
            loading={loading}
        />
    )
}
