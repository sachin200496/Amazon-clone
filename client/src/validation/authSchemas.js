import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email("Invalid email address").required,
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required")
})

export const registerSchema = yup.object({
    name: yup.string().min(2, "Name too short").required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Confirm your Password")
})