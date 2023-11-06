import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
// import toast from 'react-hot-toast';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart, removeSingle, removeToCart } from '../redux/features/cartSlice';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [totalprice, setPrice] = useState(0);
    const [totalquantity, setTotalQuantity] = useState(0);

    const { carts } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleIncrement = (data) => {
        dispatch(addToCart(data))
    }

    const handleDecrement = (data) => {
        dispatch(removeToCart(data))
    }

    const handleSingleDecrement = (data) => {
        dispatch(removeSingle(data))
    }
    const handelEmpty = (data) => {
        dispatch(clearCart(data))
    }
    
  const handleGoToCheckout = () => {
    navigate('/checkout', {
      state: {
        totalprice: totalprice,
        totalquantity: totalquantity,
      },
    });
  };

    const total = () => {
        let totalprice = 0;
        carts.map((item, ind) => {
            totalprice = item.price * item.qty + totalprice
        })
        setPrice(totalprice)
    }
    const totalqnt = () => {
        let totalquantity = 0;
        carts.map((item, ind) => {
            totalquantity = item.qty + totalquantity
        })
        setTotalQuantity(totalquantity)
    }


    useEffect(() => {
        total()
        totalqnt()
    }, [total, totalqnt])
    return (
        <div className="row justify-content-center m-0">
            <div className="col-md-8 mt-5 mb-5">
                <Card>
                    <CardHeader
                        title={
                            <Typography variant="h5" component="div">
                                Cart Calculation {carts.length > 0 ? `(${carts.length})` : ''}
                            </Typography>
                        }
                        action={
                            carts.length > 0 && (
                                // <Button variant="contained" color="secondary" size="small" onClick={emptycart}>
                                <Button variant="contained" color="secondary" size="small" onClick={() => handelEmpty(carts)}>
                                    <Delete /> Empty Cart
                                </Button>
                            )
                        }
                    />
                    <CardContent>
                        {carts.length === 0 ? (
                            <div className="cart-empty text-center p-5">
                                <Typography variant="h6">Your Cart Is Empty</Typography>
                            </div>
                        ) : (
                            <TableContainer component={Card}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Action</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell align="right">Total Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {carts.map((data) => (
                                            <TableRow key={data.id}>
                                                <TableCell>
                                                    <Button variant="contained" color="secondary" onClick={() => handleDecrement(data.id)}>
                                                        <Delete />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <img src={data.images[2]} alt="product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                </TableCell>
                                                <TableCell>{data.title}</TableCell>
                                                <TableCell>₹ {data.price}</TableCell>
                                                <TableCell>
                                                    <div className="prdct-qty-container">
                                                        <Button
                                                            variant="outlined"
                                                            onClick={(data.qty >= 1 ? () => handleSingleDecrement(data.id) : () => handleDecrement(data.id))}
                                                        >
                                                            <RemoveCircleIcon />
                                                        </Button>
                                                        <input type="text" className="qty-input-box" value={data.qty} disabled />
                                                        <Button variant="outlined" onClick={() => handleIncrement(data)}>
                                                            <AddCircleIcon />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">₹ {data.qty * data.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4}></TableCell>
                                            <TableCell>Items In Cart:</TableCell>
                                            <TableCell align="right">{totalquantity}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}></TableCell>
                                            <TableCell>Total Price:</TableCell>
                                            <TableCell align="right">₹ {totalprice}</TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}></TableCell>
                                            <TableCell align="right"><Button variant="contained" color="primary" size="small" onClick={handleGoToCheckout}>
                                                go to checkout</Button></TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Cart;
