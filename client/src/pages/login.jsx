import { Container,Box,TextField,Button,Typography,Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import { loginSchema } from "../validation/authSchemas";
import { loginUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useSnackbar } from "notistack";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";



export default function Login(){
const navigate = useNavigate();
const {enqueueSnackbar} = useSnackbar();
const login = useAuthStore((s) => s.login);
const [role, setRole] = useState('customer');

const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({resolver:yupResolver(loginSchema)});

const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    try{
        console.log("Calling loginUser API...");
        const user = await loginUser(values);
        console.log("Login response:", user);
        login(user, role);
        enqueueSnackbar(`Login successful as ${role}`, {variant: "success"});
        navigate(role === 'admin' ? '/admin' : '/');
    }
    catch (err){
        console.error("Login error:", err);
        enqueueSnackbar(err.response?.data?.message || "Login failed", {variant: "error"})
    }
};

    return(

        <Container maxWidth='xs'>
            <Paper sx={{p:3, mt: 8}}>
                <Typography variant="h5" gutterBottom align="center">
                    Sign-In
                </Typography>
                
                {/* Role Selection */}
                <Box sx={{mb: 3, display: 'flex', justifyContent: 'center'}}>
                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={(e, newRole) => {
                            if (newRole !== null) setRole(newRole);
                        }}
                    >
                        <ToggleButton value="customer" aria-label="customer">
                            <ShoppingCartIcon sx={{mr: 1}} />
                            Customer
                        </ToggleButton>
                        <ToggleButton value="admin" aria-label="admin">
                            <SecurityIcon sx={{mr: 1}} />
                            Admin
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Email" fullWidth margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                    <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                    <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{mt:2}} >
                    Sign-In as {role === 'admin' ? 'Admin' : 'Customer'}
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