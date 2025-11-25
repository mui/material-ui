import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Carousel from '@mui/carousel/Carousel';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    rating: 4.5,
    image: 'https://picsum.photos/seed/headphones/300/300',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    rating: 4.8,
    image: 'https://picsum.photos/seed/watch/300/300',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    rating: 4.2,
    image: 'https://picsum.photos/seed/speaker/300/300',
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 34.99,
    rating: 4.6,
    image: 'https://picsum.photos/seed/stand/300/300',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 59.99,
    rating: 4.4,
    image: 'https://picsum.photos/seed/hub/300/300',
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 129.99,
    rating: 4.7,
    image: 'https://picsum.photos/seed/keyboard/300/300',
  },
];

export default function ProductCarousel() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Featured Products
      </Typography>
      <Carousel
        slidesPerView={{ xs: 1, sm: 2, md: 3 }}
        spacing={16}
        aria-label="Featured products carousel"
      >
        {products.map((product) => (
          <Card key={product.id} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="180"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="subtitle1" noWrap>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Rating value={product.rating} precision={0.1} size="small" readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating})
                </Typography>
              </Box>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
}
