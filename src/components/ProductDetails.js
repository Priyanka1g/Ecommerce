// ProductDetails.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/features/apiSlice';
import './ProductDetails.css'; // Import your CSS file
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { toast } from 'react-hot-toast';
import Reviews from './Reviews';
import QuestionAnswer from './QuestionAnswer';
import {Typography} from '@mui/material';
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addData = (data) => {
    toast.success('Item added successfully');
    dispatch(addToCart(data));
  };

  const buyNow = (data) => {
    toast.success('Product bought successfully');
    navigate('/checkout', {
      state: {
        totalprice: data.price,
        totalquantity: 1,
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading</div>;
  }

  return (
    <div className="card-details-container">
      <div className="product-image-container ">
        <img src={product.images[0]} alt={`Product`} className="product-image" />
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={() => addData(product)} style={{marginRight:'10px'}}>
            Add to Cart
          </Button>
          <Button variant="contained" color="primary" onClick={() => buyNow(product)}>
            Buy now
          </Button>
        </div>
        <div className="questions-section">
          <Typography variant="h5" style={{ marginBottom: '16px' }}>
            Questions and Answers
          </Typography>

          <QuestionAnswer
            question="Can we use it while we are eating?"
            answer="Yes, only if you are not eating the mouse."
            author="Flipkart Customer"
            certification="Certified Buyer"
            key={1}
          />

          <QuestionAnswer
            question="Why I was not provided with a USB receiver?"
            answer="USB receiver inside the back panel."
            author="NEEL SEN"
            certification="Certified Buyer"
            key={2}
          />

          <QuestionAnswer
            question="How to connect the mouse? As it has no Bluetooth connection."
            answer="Just put in the USB (receiver) to your PC... Bluetooth is not even required."
            author="Rohit Negi"
            certification="Certified Buyer"
            key={3}
          />

          {/* Add more questions and answers as needed */}
        </div>
      </div>

      <div className="right-section">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <p className="price">
          Price: <span className="bold">{product.price}</span>
        </p>
        <p className="rating">Rating: {product.rating}</p>
        <div className="additional-lines">
          <p className="offer-heading">Available Offers:</p>
          <ul>
            <li>Bank Offer: Get additional ₹250 off on SBI Bank Credit Card Transactions. T&amp;C</li>
            <li>
              Bank Offer: Extra ₹750 off on SBI Credit Card and Credit EMI Txns on Net Cart Value of
              ₹24,990 and above. T&amp;C
            </li>
            <li>
              Bank Offer: Extra ₹1750 off on SBI Credit Card and Credit EMI Txns on Net Cart Value of
              ₹49,990 and above. T&amp;C
            </li>
            <li>Freebie: Flat ₹550 off on TimesPrime Annual Membership. T&amp;C</li>
            {/* Add more offers as needed */}
          </ul>
          <p className="view-more-offers">View 11 more offers</p>
        </div>
        {/* reviews section */}
        <Reviews />
      </div>
    </div>
  );
};

export default ProductDetails;
