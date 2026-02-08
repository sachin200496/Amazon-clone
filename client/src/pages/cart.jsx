import { Container,Typography,Button, cardActionAreaClasses } from "@mui/material";
import { useCartStore } from "../store/cartStore";

export default function Cart(){
const {cart, removeFromCart} = useCartStore();

    return(
       <Container sx={{py:4}}>
        <Typography variant="h5">Shopping Cart</Typography>
        {cart.map((item)=>(
            <div key={item._id}>
                {item.title} - ₹{item.price}
                <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
            </div>
        ))}
       </Container> 
    )
}