
import React, { useState } from 'react'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import toast, {Toaster} from 'react-hot-toast';
import Footer from './components/Footer';
import { useEffect } from 'react';
import Signup from './components/Signup';
import ProductDetails from './components/ProductDetails';
import ProductCards from './components/ProductCards';
function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    // const loginHandler = (email, password)=>{
    //     setIsLoggedIn(true)
    // }

    useEffect(() => {
        // Check if the user is already logged in from local storage
        setIsLoggedIn(false);
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
    
        if (storedEmail && storedPassword) {
          setIsLoggedIn(true);
        }
      }, []);

      //sign up handlerr
      const signupHandler = (name, email, password) => {
        // Storing user information in local storage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
    
        // Set the user as logged in
        setIsLoggedIn(true);
        toast.success('Signup successful!');
      }

    const loginHandler = (email, password) => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            setIsLoggedIn(true);
            toast.success('Login successful!');
          } else {
            toast.error('Invalid login credentials. Please try again.');
          }
      };

    const logoutHandler= ()=>{
        setIsLoggedIn(false)
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        toast.success('Logout successful!');
    }

    const showSignupHandler = () => {
        // Show the signup component
        setShowSignup(true);
      };

      
    return(
        <>
         {isLoggedIn ? (
        <>
          <Navbar onLogout={logoutHandler} />
          <Routes>
            <Route path='/' element={<ProductCards />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/details/:id' element={<ProductDetails />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      ): (
        <Routes>
          <Route
            path="/"
            element={
              showSignup ? (
                <Signup onSignup={signupHandler} />
              ) : (
                <Login onLogin={loginHandler} onSignupClick={showSignupHandler} />
              )
            }
          />
          <Route path="/signup" element={<Signup onSignup={signupHandler} />} />
        </Routes>
      )}
    </> 
    )
}

export default App