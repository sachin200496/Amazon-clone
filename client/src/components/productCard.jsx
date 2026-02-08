import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart)
  return (
    <Card>
      <CardMedia component="img" height="200" image={product.image} />
      <CardContent>
        <Typography variant='h6'>{product.title}</Typography>
        <Typography>{product.price}</Typography>

        <Button variant='contained' fullWidth onClick={() => addToCart(product)}>
          Add To Cart
        </Button>
        <Button size='small' fullWidth onClick={() => navigate(`/product/${product._id}`)}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}