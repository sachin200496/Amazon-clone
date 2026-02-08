import {Grid, Container} from '@mui/material';
import { useQuery} from '@tanstack/react-query';
import {getProducts} from '../api/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { data = [] } = useQuery({
    queryKey : ["products"],
    queryFn : getProducts
  })
  return (
    <Container sx={{py: 4}}>
      <Grid container spacing={2}>
        {data.map((product)=>(
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <ProductCard product={product} />
            </Grid>
        ))}
        
      </Grid>
    </Container>
  );
}