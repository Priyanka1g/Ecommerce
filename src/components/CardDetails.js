// ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/features/apiSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardDetails.css'; // Import your CSS file

const CardDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product details</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 3000,  
  };

  return (
    <div className="card-details-container">
      <Slider {...settings} className="left-section">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} className="product-image" />
        ))}
      </Slider>
      <div className="right-section">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Price: <span className="bold">{product.price}</span></p>
        <p className="rating">Rating: {product.rating}</p>
        <div className="additional-lines">
          <p className="offer-heading">Available Offers:</p>
          <ul>
            <li>Bank Offer: Get additional ₹250 off on SBI Bank Credit Card Transactions. T&C</li>
            <li>Bank Offer: Extra ₹750 off on SBI Credit Card and Credit EMI Txns on Net Cart Value of ₹24,990 and above. T&C</li>
            <li>Bank Offer: Extra ₹1750 off on SBI Credit Card and Credit EMI Txns on Net Cart Value of ₹49,990 and above. T&C</li>
            <li>Freebie: Flat ₹550 off on TimesPrime Annual Membership. T&C</li>
            {/* Add more offers as needed */}
          </ul>
          <p className="view-more-offers">View 11 more offers</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
