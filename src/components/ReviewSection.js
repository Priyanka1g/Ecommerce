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
    const overallRating = calculateOverallRating(reviews);
    const overallReviews = calculateOverallReviews(reviews);

    return (
        <Box>
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
            {productReviews.map((review, index) => (
                <Box key={index} mb={3}>
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
                    {review.image && (
                        <img
                            src={URL.createObjectURL(review.image)}
                            alt="review"
                            style={{ width: '100px', maxHeight: '100px', objectFit: 'cover' }}
                        />
                    )}
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
const calculateOverallRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
};
const calculateOverallReviews = (reviews) => {
    return {
        totalRatings: reviews.length * 5,
        totalReviews: reviews.length,
        ratings: Array(5).fill(reviews.length),
        categoryRatings: [
            { name: 'Category 1', value: 4.5 },
            { name: 'Category 2', value: 4.2 },
        ],
    };
};

export default ReviewSection;
