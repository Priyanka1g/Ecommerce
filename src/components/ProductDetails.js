import React from 'react';
import { Grid, Typography, Box, Container, Button, IconButton, } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-image-gallery';
import { useGetProductByIdQuery } from '../redux/features/apiSlice';
import { useParams } from 'react-router-dom';
import ReviewSection from './ReviewSection';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Fetch product data using useGetProductByIdQuery
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const addData = (data) => {
    // toast.success("Item added successfully");
    dispatch(addToCart(data));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading</div>;
  }

  const images = product.images.map(image => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ position: 'sticky', top: '80px', height: 'calc(100vh - 10px)' }}>
          <Gallery items={images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box mt={2} mb={2}>
              <Button variant="contained" color="warning" onClick={() => console.log('Buy now')} style={{ marginRight: "5px" }}>
                Buy now
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => { addData(product) }}
              >
                Add to Cart
              </Button>
              <IconButton color="default" aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="default" aria-label="share">
                <ShoppingCartIcon />
              </IconButton>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Available Offers
              </Typography>
              <Typography variant="body2" paragraph>
                Bank Offer: 10% off on Samsung Axis Bank Infinite Credit Card (T&C)
              </Typography>
              <Typography variant="body2" paragraph>
                Bank Offer: 10% off on Samsung Axis Bank Signature Credit Card (T&C)
              </Typography>
              <Typography variant="body2" paragraph>
                Bank Offer: 5% Cashback on Flipkart Axis Bank Card (T&C)
              </Typography>
              <Typography variant="body2" paragraph>
                Special Price: Get extra ₹7800 off (price inclusive of cashback/coupon) (T&C)
              </Typography>
              <Typography variant="body2">
                View 3 more offers
              </Typography>
            </Box>
            <ReviewSection productId={id} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
