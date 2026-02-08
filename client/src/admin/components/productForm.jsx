import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadToCloudinary } from "../../api/upload";

export default function ProductForm({initialValues,onSubmit,loading,title}){
    const {register, handleSubmit,setValue, formState:{errors}} = useForm({defaultValues: initialValues})

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(initialValues.image || ""
    );
    
    const handleImageUpload = async (e) =>{
        const file = e.target.file[0];
        if(!file) return;
        setUploading(true);

        try{
            const imageUrl = await uploadToCloudinary(file);
            setValue("image", imageUrl);
            setPreview(imageUrl);
        }
        catch(err){
            alert("Image upload failed")
        }
        finally{
            setUploading(false);
        }
    };

    return(
        <Paper sx={{p:3, maxWidth: 700}}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            
            <form onSubmit={handleSubmit(onSubmit)}>
             <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                    label='Product Title' 
                    fullWidth
                    {...register("title"),{required:"Title is required"}}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                    />

                    <Grid item xs={6}>
                        <TextField
                         label='Price'
                         type='number'
                         fullWidth
                         {...register("price", {required:"Price is required"})}
                         error={!!errors.price}
                         helperText={errors.price?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                        label="Stock"
                        type="number"
                        fullWidth
                        {...register("stock", {required:"Stock is required"})}
                        error={!!errors.stock}
                        helperText={errors.stock ? errors.title.message : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                        label="category"
                        fullWidth
                        {...register("category", {required:"Category is required"})}
                        error={!!errors.category}
                        helperText={errors.category ? errors.category.message : ""}
                        />
                    </Grid>

                    {/* image Upload */}
                   <Grid item xs={12}>
                    <Button variant="outlined" component="label">
                        {uploading ? "Uploading..." : "Upload Image"}
                        <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                    </Button>

                    {preview && (
                        <Box sx={{mt:2}}>
                            <img src={preview}
                              alt="preview"
                              style={{
                                width:120,
                                height:120,
                                objectFit:"cover",
                                borderRadius:4
                              }}
                            />
                        </Box>
                    )}

                   </Grid>



                    

                    <Grid item xs={12}>
                        <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        {...register("description", {required:"Description is required"})}
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ""}
                        />
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
            </form>
        </Paper>
    )

}