// OrderItems.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
} from '@mui/material';
import { addReview } from '../redux/features/reviewSlice';

const OrderItems = () => {
    const { orders } = useSelector((state) => state.order);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isReviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewImage, setReviewImage] = useState(null);
    const [reviewDescription, setReviewDescription] = useState('');
    const dispatch = useDispatch()
    const handleOpenReviewDialog = (product) => {
        setSelectedProduct(product);
        setReviewDialogOpen(true);
    };

    const handleCloseReviewDialog = () => {
        setSelectedProduct(null);
        setRating(0);
        setReviewText('');
        setReviewDialogOpen(false);
    };
    const handleImageChange = (event) => {
        // Handle image upload and update the state
        const file = event.target.files[0];
        setReviewImage(file);
    };

    const handleSaveReview = () => {
        const currentDate = new Date();
        const reviewData = {
            productId: selectedProduct.id,
            rating,
            reviewText,
            reviewDescription,
            userName: localStorage.getItem('userName'),
            location: 'jp, rj',
            designation: 'Certified buyer',
            date: currentDate.toISOString(),
            image: reviewImage,
          };
        
          dispatch(addReview(reviewData));
          handleCloseReviewDialog();
        };


    return (
        <div className="row justify-content-center m-0">
            <div className="col-md-8 mt-5 mb-5">
                <Card>
                    <CardContent>
                        <TableContainer component={Card}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell align="right">Total Amount</TableCell>
                                        <TableCell>Rate and Reviews</TableCell> {/* New column for Rate and Reviews */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order, orderIndex) => (
                                        <React.Fragment key={orderIndex}>
                                            {order.map((item, itemIndex) => (
                                                <TableRow key={itemIndex}>
                                                    <TableCell>
                                                        <img
                                                            src={item.images[0]}
                                                            alt="product"
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>₹ {item.price}</TableCell>
                                                    <TableCell>{item.qty}</TableCell>
                                                    <TableCell align="right">₹ {item.qty * item.price}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleOpenReviewDialog(item)}
                                                        >
                                                            Rate and Reviews
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="col-md-8 mt-2">
                {selectedProduct && (
                    <Dialog open={isReviewDialogOpen} onClose={handleCloseReviewDialog}>
                        <DialogTitle>{`Rate and Review ${selectedProduct.title}`}</DialogTitle>
                        <DialogContent>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Your Review"
                                type="text"
                                fullWidth
                                multiline
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                value={reviewDescription}
                                onChange={(e) => setReviewDescription(e.target.value)}
                            />
                            <input type="file" onChange={handleImageChange} accept="image/*" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseReviewDialog}>Cancel</Button>
                            <Button onClick={handleSaveReview} variant="contained" color="primary">
                                Save Review
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default OrderItems;
