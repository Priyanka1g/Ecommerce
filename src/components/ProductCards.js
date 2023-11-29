import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useGetProductsQuery } from "../redux/features/apiSlice";
import { addToCart } from "../redux/features/cartSlice";
import Sidebar from "./Sidebar/Sidebar";
import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Recommended from "./Recommended";
import "./ProductCards.css";
import { Link } from "react-router-dom";

const ProductCards = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(null); // Use null to represent no price filter
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

  const filterByCategory =
    selectedCategory !== "All" ? products.filter((item) => item.category === selectedCategory) : products;

  const filterByPrice =
    selectedPrice
      ? filterByCategory.filter(
        (item) => item.price >= selectedPrice.min && item.price <= selectedPrice.max
      )
      : filterByCategory;

  const filteredProducts = filterByPrice.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Sidebar
        handleChange={(e) => setSelectedPrice(e)}
        handleCategoryChange={(e) => setSelectedCategory(e.target.value)}
      />
      <Recommended />
      <section className="card-container">
        {filteredProducts.map((item, id) => (
          <section className="card" key={id}>
            <img src={item.images[0]} alt={item.title} className="card-img" />
            <div className="card-details">
              <Link to={`/details/${item.id}`} style={{ textDecoration: 'none' }}>
                <h3 className="card-title">{item.title}</h3>
              </Link>
              <section className="card-reviews">
                <AiFillStar className="rating-star"></AiFillStar>
                <AiFillStar className="rating-star"></AiFillStar>
                <AiFillStar className="rating-star"></AiFillStar>
                <AiFillStar className="rating-star"></AiFillStar>
                <span className="total-reviews">{item.reviews}</span>
              </section>
              <section className="card-price">
                <div className="price">
                  <del>{item.price}</del> {item.price - 5}
                </div>
                <div className="bag">
                  <BsFillBagFill
                    className="bag-icon"
                    onClick={() => {
                      addData(item);
                    }}
                  />
                </div>
              </section>
            </div>
          </section>
        ))}
      </section>
    </>
  );
};

export default ProductCards;
