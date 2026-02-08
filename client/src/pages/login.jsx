import { Container,Box,TextField,Button,Typography,Paper } from "@mui/material"
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import { loginSchema } from "../validation/authSchemas";
import { loginUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useSnackbar } from "notistack";
import { Link,useNavigate } from "react-router-dom";



export default function Login(){
const navigate = useNavigate();
const {enqueueSnackbar} = useSnackbar();
const login = useAuthStore((s) => s.login);

const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({resolver:yupResolver(loginSchema)});

const onSubmit = async (values) => {
    try{
        const user = await loginUser(values);
        login(user);
        enqueueSnackbar("Login successful", {variant: "success"});
        navigate('/');
    }
    catch (err){
        enqueueSnackbar(err.response?.data?.message || "Login failed", {variant: "error"})
    }
};

    return(

        <Container maxWidth='xs'>
            <Paper sx={{p:3, mt: 8}}>
                <Typography variant="h5" gutterBottom>
                    Sign-In
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Email" fullWidth margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                    <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                    <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{mt:2}} >
                    Sign-In
                    </Button>
                </Box>
                <Typography variant="body2" sx={{mt:2}}>
                    New to Amazon ?{" "}
                    <Link to="/register">Create your account</Link>
                </Typography>
            </Paper>
        </Container>
    )
}