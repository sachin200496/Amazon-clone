import {Container,Box,TextField,Button,Typography,Paper} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../validation/authSchemas';
import { registerUser } from '../api/auth';
import { useSnackbar } from 'notistack';
import {Link, useNavigate} from 'react-router-dom';

export default function Register(){
const navigate = useNavigate();
const {enqueueSnackbar} = useSnackbar();

const {register,handleSubmit, formState:{errors, isSubmitting}} = useForm({resolver: yupResolver(registerSchema)});

const onSubmit = async (values) =>{
try{
    await registerUser(values);
    enqueueSnackbar("Account has been successfully created",{variant:"success"});
}
catch(err){
    enqueueSnackbar(err.response?.data?.message || "Registration Failed", {variant:"error"});

}
};
    return(
      <Container maxWidth='xs'>
        <Paper sx={{p:3, mt:8}}>
            <Typography variant='h5' gutterBottom>
                Create an Account
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} >
                <TextField label="Your Name" fullWidth margin='normal' {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                <TextField label="Email" fullWidth margin='normal' {...register("email")} error={!!errors.email} helperText={errors.email?.message}  />
                <TextField label="password" fullWidth margin='normal' {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                <TextField label="Confirm Password" fullWidth margin='normal' {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
                <Button type='submit' fullWidth variant='contained' disabled={isSubmitting} sx={{mt: 2}}>
                    Create Account
                </Button>
             </Box>
             <Typography variant='body2' sx={{mt:2}}>
                    Already have an account ? {" "}
                    <Link to="/login">Sign-In</Link>
             </Typography>
        </Paper>
      </Container>
    )
}