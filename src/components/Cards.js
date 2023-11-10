import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useGetProductsQuery } from "../redux/features/apiSlice";
import { addToCart } from "../redux/features/cartSlice";
import { Link } from "react-router-dom";
const Cards = () => {
  const dispatch = useDispatch();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const addData = (data) => {
    toast.success("Item added successfully");
    dispatch(addToCart(data));
   
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const filteredProducts = products
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOption === "highToLow") {
        return b.price - a.price;
      } else if (sortOption === "highToLowRating") {
        return b.rating - a.rating;
      } else if (sortOption === "lowToHighRating") {
        return a.rating - b.rating;
      } else {
        return 0; // default case, no sorting
      }
    });

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
       
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Featured Products
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort By Price"
              style={{marginBottom:"10px"}}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
              <MenuItem value="highToLow">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort by Rating</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort By Rating"
              style={{marginBottom:"10px"}}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHighRating">Low to High Rating</MenuItem>
              <MenuItem value="highToLowRating">High to Low Rating</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <img
        className="_2OHU_q aA9eLq"
        alt="a"
        srcSet="https://rukminim2.flixcart.com/fk-p-flap/3600/3600/image/d1e510f2702db1f9.jpg?q=80 2x, https://rukminim2.flixcart.com/fk-p-flap/1800/1800/image/d1e510f2702db1f9.jpg?q=80 1x"
        src="https://rukminim2.flixcart.com/fk-p-flap/1800/1800/image/d1e510f2702db1f9.jpg?q=80"
        data-tkid="M_c1f81ee4-4b2d-419c-a773-a10e616b2b0b_1.0QZXPLOT3WWW"
        style={{ width: "100%", height: "auto", marginBottom:"30px"}}
      />
      <Grid container spacing={12}>
        {filteredProducts.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                alt={item.title}
                height="400"
                image={item.images[1]}
                style={{ objectFit: "cover", marginBottom: "20px" }}
              />
              <CardContent style={{ flex: "1" }}>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {item.rating}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addData(item);
                  }}
                  style={{ marginTop: "10px" }}
                >
                  Add to Cart
                </Button>
                <Link to={`/details/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary" style={{ marginTop: "10px", marginLeft:"10px"}}>
                    More Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
