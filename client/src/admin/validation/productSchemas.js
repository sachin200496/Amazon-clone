import * as yup from 'yup';

export const productSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image is required")
});