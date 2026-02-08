
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";


const products = [
    {id:1,title:'Wireless Headphones',price:5000,stock:100},
    {id:2,title:'Smart Watch',price:2999,stock:10},
    {id:3,title:'Bluetooth Speaker',price:1999,stock:200},
    {id:4,title:'Laptop Stand',price:1499,stock:50},
];

export default function Products(){

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
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((p) => (
                    <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.title}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>₹{p.price}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell align="right">
                            <Button size="small" component={Link}
                            to={`/admin/products/edit/${p.id}`}>
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {products.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
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