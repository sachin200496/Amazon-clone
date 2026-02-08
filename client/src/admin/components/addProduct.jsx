import ProductForm from "./productForm";
import { createProduct } from "../api/adminProducts";
import { useNavigate } from "react-router-dom";



export default function AddProduct(){
    const navigate = useNavigate();
    const handleAdd = async (data) =>{
        await createProduct(data)
        navigate("/admin/products")
    }

return(
    <ProductForm
    title="Add New Product"
    initialValues={{
        title:"",
        price:"",
        stock:"",
        category:"",
        image:"",
        description:""
    }}   
    onSubmit={handleAdd}
    />
)
}