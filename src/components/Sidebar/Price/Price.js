import React from "react";
import Input from "../../layout/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>
        <div className="sidebar-items ">
        <Input handleChange={() => handleChange({ min: 0, max: 5000 })} value={5000} title="All" name="price" />

        <Input handleChange={() => handleChange({ min: 0, max: 100 })} value={100} title="$0 - $100" name="price" />

        <Input handleChange={() => handleChange({ min: 100, max: 1000 })} value={1000} title="$100 - $1000" name="price" />

        <Input handleChange={() => handleChange({ min: 1000, max: 1500 })} value={1500} title="$1000 - $1500" name="price" />

        <Input handleChange={() => handleChange({ min: 1500, max: 3000 })} value={3000} title="Over $1500" name="price" />
      </div>
      </div>
    </>
  );
};

export default Price;
