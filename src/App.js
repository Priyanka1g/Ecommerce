import React, { useState } from 'react'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Signup from './components/Signup';
import ProductDetails from './components/ProductDetails';
import ProductCards from './components/ProductCards';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // Check if the user is already logged in from local storage
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        //check user exist alredy if yes then setloggedin true
        if (storedEmail && storedPassword) {
            setIsLoggedIn(true);
        }
    }, []);

    //When user sign up this will run 
    const signupHandler = (name, email, password) => {
        // Storing user information in local storage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        // Set the user as logged in
        setIsLoggedIn(true);
        toast.success('Signup successful!');
    }

    //This function will run when user login
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

    //this function will run when user logout
    const logoutHandler = () => {
        setIsLoggedIn(false)
        // localStorage.removeItem('userName');
        // localStorage.removeItem('userEmail');
        // localStorage.removeItem('userPassword');
        toast.success('Logout successful!');
    }
    return (
        <>
            {isLoggedIn ? (
                <>
                    <Navbar onLogout={logoutHandler} getDataHandler={setSearchTerm} />
                    <Routes>
                        <Route path='/' element={<ProductCards search={searchTerm}/>} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/details/:id' element={<ProductDetails />} />
                    </Routes>
                    {/* <Footer /> */}
                    <Toaster />
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={loginHandler} />} />
                    <Route path="/signup" element={<Signup onSignup={signupHandler} />} />
                </Routes>
            )}
        </>
    )
}

export default App