import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
const Cards = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch()

  const addData = (data)=>{

    dispatch(addToCart(data))
    toast.success("Item added successfully")
  }
  useEffect(()=>{
    axios.get("http://localhost:3001/products").then((response)=>setProducts(response.data))
  })
  return (
    <div style={{ marginTop: "20px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>Featured Products</Typography>
    <Grid container spacing={2}>
      {products.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt={item.title}
              height="300"
              image={item.images[0]}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item.price}
              </Typography>
              <Button variant="contained" color="primary" onClick={()=>{addData(item)}}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Cards;
