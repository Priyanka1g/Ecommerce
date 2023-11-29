// App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { login, logout, selectIsLoggedIn } from './redux/features/loginSlice'
import { signup, selectSignupInfo } from './redux/features/signupSlice';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ProductCards from './components/ProductCards';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import toast, { Toaster } from 'react-hot-toast';
import ProductDetails from './components/ProductDetails';
import UserProfile from './components/UserProfile';
import OrderItems from './components/OrderItems';

import './App.css';

const usersData = require('./users.json');
const usersArray = usersData.users; // Access the "users" array

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const signupInfo = useSelector(selectSignupInfo);

  const [searchTerm, setSearchTerm] = useState('');

  const signupHandler = (name, email, password) => {
    // You would typically hash the password before storing it in a real-world scenario
    const newUser = { name, email, password };

    // Push the new user to the array
    usersArray.push(newUser);

    // Assuming that you have a `signup` action that updates the Redux store with the user information
    dispatch(signup(newUser));

    // Automatically log in after signup
    dispatch(login());

    // Display a success message
    toast.success('Signup successful!');
  };

  const loginHandler = (email, password) => {
    // Use find on the array
    const user = usersArray.find(u => u.email === email && u.password === password);

    if (user) {
      dispatch(login());
      toast.success('Login successful!');
    } else {
      toast.error('Invalid login credentials. Please try again.');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logout successful!');
  };

  useEffect(() => {
    // No need to check localStorage; you can use a server-based solution here
    // For simplicity, let's assume a user is logged in if the signupInfo is available
    if (signupInfo.userEmail) {
      dispatch(login());
    }
  }, [dispatch, signupInfo]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar onLogout={logoutHandler} getDataHandler={setSearchTerm} />
          <Routes>
            <Route path='/' element={<ProductCards searchTerm={searchTerm} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/details/:id' element={<ProductDetails />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/orderpage' element={<OrderItems />} />
          </Routes>
          <Toaster />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={loginHandler} />} />
          <Route path="/signup" element={<Signup onSignup={signupHandler} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
