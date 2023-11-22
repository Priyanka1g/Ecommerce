import React, { useState } from 'react';
import { Typography, List, ListItem, Divider, TextareaAutosize, Button, Box, Rating } from '@mui/material';

const containerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  padding: '16px',
};

const reviewListStyle = {
  marginTop: '16px',
};

const reviewItemStyle = {
  marginBottom: '16px',
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const addReviewSectionStyle = {
  marginTop: '16px',
};

const textareaStyle = {
  width: '100%',
  height: '80px',
  resize: 'vertical',
  marginBottom: '16px',
};

const buttonBoxStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '16px',
};

const ratingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
};

const authorStyle = {
    marginTop: '8px',
    fontSize: '14px',
    color: '#777',
  };

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      review: 'This product is amazing! Great value for money. Excellent quality and fast shipping.',
      author: 'John Doe',
    },
    {
      rating: 4,
      review: 'Good product. Worth the price.',
      author: 'Jane Doe',
    },
  ]);

  const [newReview, setNewReview] = useState('');

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const submitReview = () => {
    if (newReview.trim() !== '') {
      // Assuming new review is a string, you can modify as needed
      const newReviewObject = {
        rating: 5, // Set the rating as needed
        review: newReview,
        author: localStorage.getItem('userName'), // Set the author dynamically or fetch from user info
      };

      setReviews([...reviews, newReviewObject]);
      setNewReview('');
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <Box style={containerStyle}>
      <Typography variant="h5" style={{ marginBottom: '16px' }}>
        Ratings & Reviews
      </Typography>

      <Box style={ratingContainerStyle}>
        <Rating name="average-rating" value={calculateAverageRating()} precision={0.1} readOnly />
        <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
          {calculateAverageRating().toFixed(1)}★
        </Typography>
      </Box>

      <List style={reviewListStyle}>
        {reviews.map((review, index) => (
          <React.Fragment key={index}>
            <ListItem style={reviewItemStyle}>
              <Typography variant="body1">{review.review}</Typography>
              <Typography variant="subtitle2" style={authorStyle}>
                - {review.author}
              </Typography>
            </ListItem>
            {index < reviews.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <div style={addReviewSectionStyle}>
        <TextareaAutosize
          placeholder="Write your review here..."
          value={newReview}
          onChange={handleReviewChange}
          style={textareaStyle}
        />
        <Box style={buttonBoxStyle}>
          <Button variant="contained" color="primary" onClick={submitReview}>
            Submit Review
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default Reviews;
