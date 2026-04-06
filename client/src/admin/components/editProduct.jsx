// import {useEffect, useState} from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import ProductForm from "./productForm";
// import { getProductById,updateProduct } from "../api/adminProducts";

// export default function EditProducts(){
// const {id} = useParams();
// const navigate = useNavigate();
// const [product, setProduct] = useState(null);

// useEffect(() =>{
//     getProductById(id).then(setProduct);
// },[id]);

// const handleUpdate = async (data) =>{
//    await updateProduct(id, data);
//    navigate("/admin/products")
// }

// return(
//     <ProductForm 
//     title="Edit Product"
//     initialValues={product}
//     onSubmit={handleUpdate}
//     />
// )
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./productForm";
import { getProductById, updateProduct } from "../api/product.js";
import { CircularProgress, Box } from "@mui/material";

export default function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);
console.log(product)
  const handleUpdate = async (data) => {
    await updateProduct(id, data);
    navigate("/admin/products");
  };

  // Don't render the form until product data is loaded —
  // this ensures react-hook-form's defaultValues are populated correctly
  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProductForm
      title="Edit Product"
      initialValues={product.data}
      onSubmit={handleUpdate}
    />
  );
}
