// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Box,
//   Typography
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import {yupResolver} from "@hookform/resolvers/yup";
// import { productSchema } from "../validation/productSchemas";
// import axios from "axios";

// export default function ProductForm({initialValues,onSubmit,loading,title}){
//     const {register, handleSubmit, formState:{errors}} = 
//     useForm({defaultValues: initialValues,resolver: yupResolver(productSchema)});

    
//     const [preview, setPreview] = useState( initialValues?.image ? [initialValues.image] : []);
//     const [imageFiles, setImageFiles] = useState();

//      const handleImageChange = (e) =>{
//             const files = Array.from(e.target.files);
//             if (!files.length) return;
//             setImageFiles(files);
//             setPreview(files.map(file => URL.createObjectURL(file)));
//         }
    
//     const handleSubmitForm = async (formData) => {
//         console.log("Form submitted! Validation passed.");
//         console.log("Form data:", formData);
//         console.log("Image files:", imageFiles);
        
//         try {
//             if (!imageFiles || imageFiles.length === 0) {
//                 alert("Please upload at least one image");
//                 console.warn("No image files selected");
//                 return;
//             }

//             const formDataToSend = new FormData();
//             formDataToSend.append("name", formData.name);
//             formDataToSend.append("price", formData.price);
//             formDataToSend.append("stock", formData.stock);
//             formDataToSend.append("category", formData.category);
//             formDataToSend.append("description", formData.description);
            
//             imageFiles.forEach(file => {
//                 formDataToSend.append("images", file);
//             });

//             console.log("Submitting product data to API...");
//             await onSubmit(formDataToSend);
//             console.log("Product submitted successfully");
//         } catch (err) {
//             console.error("Error submitting form:", err);
//             alert(err.message || "Failed to submit form");
//         }
//     }
       
//     return(
//         <Paper sx={{p:3, maxWidth: 700}}>
//             <Typography variant="h6" gutterBottom>
//                 {title}
//             </Typography>
            
//             {/* product form */}
//             <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
//              <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <TextField 
//                     label='Product Title' 
//                     fullWidth
//                     size="medium"
//                     {...register("name")}
//                     error={!!errors.name}
//                     helperText={errors.name ? errors.name.message : ''}
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         height: '50px',
//                       }
//                     }}
//                     />
//                 </Grid>

//                 <Grid item xs={6}>
//                     <TextField
//                      label='Price'
//                      type='number'
//                      fullWidth
//                      size="medium"
//                      {...register("price")}
//                      error={!!errors.price}
//                      helperText={errors.price?.message}
//                      sx={{
//                       '& .MuiOutlinedInput-root': {
//                         height: '50px',
//                       }
//                     }}
//                     />
//                 </Grid>

//                 <Grid item xs={6}>
//                     <TextField
//                     label="Stock"
//                     type="number"
//                     fullWidth
//                     size="medium"
//                     {...register("stock")}
//                     error={!!errors.stock}
//                     helperText={errors.stock ? errors.title.message : ""}
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         height: '50px',
//                       }
//                     }}
//                     />
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField 
//                     label="category"
//                     fullWidth
//                     size="medium"
//                     {...register("category")}
//                     error={!!errors.category}
//                     helperText={errors.category ? errors.category.message : ""}
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         height: '50px',
//                       }
//                     }}
//                     />
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField
//                     label="Description"
//                     fullWidth
//                     multiline
//                     rows={5}
//                     size="medium"
//                     {...register("description")}
//                     error={!!errors.description}
//                     helperText={errors.description ? errors.description.message : ""}
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         minHeight: '120px',
//                       }
//                     }}
//                     />
//                 </Grid>

//                 <Grid item xs={12}>
//                     <Button variant="outlined" component="label">
//                        Upload Images
//                         <input hidden type="file" accept="image/*" multiple onChange={handleImageChange} />
//                     </Button>
//                     <Box sx={{mt:3, display:"flex", gap:3, flexWrap:"wrap"}}>
//                         {preview.map((src, i) => (
//                             <img src={src} key={i}
//                               alt="preview"
//                               style={{
//                                 width:120,
//                                 height:120,
//                                 objectFit:"cover",
//                                 borderRadius:4
//                               }}
//                             />)
//                         )}
//                     </Box>
//                 </Grid>

//                 <Grid item xs={12}>
//                     <Button 
//                     type="submit" 
//                     variant="contained" 
//                     disabled={loading}
//                     >
//                         {loading ? 'Saving...' : 'Save'}
//                     </Button>
//                 </Grid>
//              </Grid>  
//             </Box>
//         </Paper>
//     )

// }

import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../validation/productSchemas";

export default function ProductForm({ initialValues, onSubmit, loading, title }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,       // works correctly because EditProduct
    resolver: yupResolver(productSchema), // waits until product is loaded
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);
 

  const [preview, setPreview] = useState(
    initialValues?.image ? [initialValues.image] : []
  );
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImageFiles(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // Renamed to handleFormSubmit so it doesn't shadow the `onSubmit` prop
  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={6}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>

          {/* Stock */}
          <Grid item xs={6}>
            <TextField
              label="Stock"
              type="number"
              fullWidth
              {...register("stock")}
              error={!!errors.stock}
              helperText={errors.stock?.message}  
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              {...register("category")}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          {/* Image upload */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Images
              <input
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Button>

            <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
}