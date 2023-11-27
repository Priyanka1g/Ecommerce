// ReviewSection.js

import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useSelector } from 'react-redux';

const ReviewSection = ({ productId }) => {
    const reviews = useSelector((state) => state.review.reviews);
    console.log(reviews)
    console.log(productId)
    const productReviews = reviews.filter((review) => review.productId == productId);
    console.log(productReviews)
    // Calculate overall ratings based on actual data
    const overallRating = calculateOverallRating(reviews);

    // Calculate overall reviews based on actual data
    const overallReviews = calculateOverallReviews(reviews);

    return (
        <Box>
            {/* Title with overall reviews */}
            <Box mb={3} mt={2}>
                <Typography variant="h5" gutterBottom>
                    Ratings & Reviews
                </Typography>
                <Box display="flex" alignItems="center">
                    {/* Overall Rating */}
                    <Rating value={overallRating} precision={0.1} readOnly />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {overallReviews.totalRatings} Ratings & {overallReviews.totalReviews} Reviews
                    </Typography>
                </Box>

                {/* Category Ratings */}
                <Box mt={2} mb={3} >
                    {overallReviews.categoryRatings.map((category, index) => (
                        <Box key={index} display="flex" alignItems="center" mb={1}>
                            <Typography variant="body2">{category.value}</Typography>
                            <Rating value={category.value} precision={0.1} readOnly sx={{ ml: 1 }} />
                            <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                                {category.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* User Reviews */}
            {productReviews.map((review, index) => (
                <Box key={index} mb={3}>
                    {/* User Rating */}
                    <Box display="flex" alignItems="center" mb={1}>
                        <Rating value={review.rating} readOnly />
                        <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                            {review.rating}
                        </Typography>
                    </Box>

                    <Typography variant="body1" mb={1}>
                        {review.reviewText}
                    </Typography>

                    {review.reviewDescription && (
                        <Typography variant="body2" color="textSecondary" mb={1}>
                            {review.reviewDescription}
                        </Typography>
                    )}

                    {/* Review Image */}
                    {review.image && (
                        <img
                            src={URL.createObjectURL(review.image)}
                            alt="review"
                            style={{ width: '100px', maxHeight: '100px', objectFit: 'cover' }}
                        />
                    )}

                    {/* User Details and Date */}
                    <Typography variant="body2" color="textSecondary">
                        {review.userName}, {review.designation}, {review.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {review.date}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

// Helper function to calculate overall rating
const calculateOverallRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
};

// Helper function to calculate overall reviews
const calculateOverallReviews = (reviews) => {
    // Implement your logic to calculate overall reviews here
    // For now, using dummy data as an example
    return {
        totalRatings: reviews.length * 5, // Assuming each review is rated 5 for simplicity
        totalReviews: reviews.length,
        ratings: Array(5).fill(reviews.length), // Assuming 5-star ratings for simplicity
        categoryRatings: [
            { name: 'Category 1', value: 4.5 },
            { name: 'Category 2', value: 4.2 },
            // Add more categories as needed
        ],
    };
};

export default ReviewSection;
