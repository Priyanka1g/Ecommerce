import React from 'react';
import { Typography, TextField, Box, Grid, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { totalprice, totalquantity } = location.state;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Billing Address
      </Typography>
      <Grid container spacing={2}>
        {/* Left Side: User Details Form */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5">Enter Your Details</Typography>
            <TextField fullWidth margin="normal" label="Full Name" variant="outlined" />
            <TextField fullWidth margin="normal" label="Address" variant="outlined" />
            <TextField fullWidth margin="normal" label="Mobile Number" variant="outlined" />
            <TextField fullWidth margin="normal" label="Email" variant="outlined" />
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} >
              Continue to Payment
            </Button>
          </Paper>
        </Grid>
        {/* Right Side: Order Summary */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', border: '2px solid black' }}>
            <Box style={{ background: 'black', color: 'white', padding: '10px', marginBottom: '10px' }}>
              <Typography variant="h5">Order Summary</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="10px">
              <Typography variant="body1">Total Items:</Typography>
              <Typography variant="body1">{totalquantity}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Total Price:</Typography>
              <Typography variant="body1">₹ {totalprice}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default Checkout;
