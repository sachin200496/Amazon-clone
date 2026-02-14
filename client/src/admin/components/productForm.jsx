import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import { productSchema } from "../validation/productSchemas";

export default function ProductForm({initialValues,onSubmit,loading,title}){
    const {register, handleSubmit, formState:{errors}} = 
    useForm({defaultValues: initialValues,resolver: yupResolver(productSchema)});

    
    const [preview, setPreview] = useState( initialValues?.image ? [initialValues.image] : []);
    const [imageFiles, setImageFiles] = useState();

     const handleImageChange = (e) =>{
            const files = Array.from(e.target.files);
            if (!files.length) return;
            setImageFiles(files);
            setPreview(files.map(file => URL.createObjectURL(file)));
        }
    
    const onSubmit = async(data) =>{
        try{ 
            const formData = new FormData();
             formData.append("title", data.title);
             formData.append("price", data.price);
             formData.append("stock", data.stock);
             formData.append("category", data.category);
             formData.append("description", data.description);
             imageFiles.forEach(file => formData.append("images", file));

             await axios.post("http://localhost:5000/api/products", formData)
        }
        catch(err){
            console.error(err.response?.data || err.message)
            alert("upload failed")
        }}

       
    return(
        <Paper sx={{p:3, maxWidth: 700}}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
             <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                    label='Product Title' 
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                    />

                    <Grid item xs={6}>
                        <TextField
                         label='Price'
                         type='number'
                         fullWidth
                         {...register("price")}
                         error={!!errors.price}
                         helperText={errors.price?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                        label="Stock"
                        type="number"
                        fullWidth
                        {...register("stock")}
                        error={!!errors.stock}
                        helperText={errors.stock ? errors.title.message : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                        label="category"
                        fullWidth
                        {...register("category")}
                        error={!!errors.category}
                        helperText={errors.category ? errors.category.message : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ""}
                        />
                    </Grid>

                   <Grid item xs={12}>
                    <Button variant="outlined" component="label">
                       Upload Images
                        <input hidden type="file" accept="image/*" multiple onChange={handleImageChange} />
                    </Button>
<Box sx={{mt:2,display:"flex", gap:2, flexWrap:"wrap"}}>
                    {preview.map((src, i) => (
                        
                            <img src={src} key={i}
                              alt="preview"
                              style={{
                                width:120,
                                height:120,
                                objectFit:"cover",
                                borderRadius:4
                              }}
                            />)
                        
                    )}
</Box>
                   </Grid>



                    

                    
                    <Grid item xs={12}>
                        <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </Button>
                </Grid>

                    
                
                </Grid>
             </Grid>  
            </Box>
        </Paper>
    )

}