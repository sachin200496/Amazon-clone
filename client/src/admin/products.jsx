
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProductStore } from "./store/store.js";
import { useEffect } from "react";

export default function Products(){
const products = useProductStore((s)=> s.products)
const getProducts = useProductStore((s) => s.getProducts)

useEffect(() => {
    getProducts()
},[])
console.log(products)
    return( 
        <>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2}}>
   <Typography variant="h5" gutterBottom>
        Products
    </Typography>
    <Button 
    variant="contained" component={Link} to="/admin/products/add">
        Add Product
    </Button>
</Box>
    <Paper >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Id</TableCell>
                    <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Name</TableCell>
                    <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Category</TableCell>
                    <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Price</TableCell>
                    <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Stock</TableCell>
                    <TableCell align="right" sx={{fontWeight:600,fontSize:"1rem"}}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products && products.length > 0 ? (
                    products.map((p) => (
                        <TableRow key={p._id}>
                            <TableCell>{p._id}</TableCell>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>₹{p.price}</TableCell>
                            <TableCell>{p.stock}</TableCell>
                            <TableCell align="right">
                                <Button size="small" sx={{border:"1px solid black"}} component={Link}
                                to={`/admin/products/edit/${p._id}`}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} align="center">
                            No Products Found
                        </TableCell> 
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Paper>
    </>
    )
}