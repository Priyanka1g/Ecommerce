import React from "react";
import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import "./Sidebar.css";

const Sidebar = ({ handleChange, handleCategoryChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={handleCategoryChange} />
        <Price handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
