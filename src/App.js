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
import UserProfile from './components/UserProfile';
import OrderItems from './components/OrderItems';
function App() {
    const theme = {
        colors: {
          heading: "rgb(24 24 29)",
          text: "rgba(29 ,29, 29, .8)",
          white: "#fff",
          black: " #212529",
          helper: "#8490ff",
    
          bg: "#F6F8FA",
          footer_bg: "#0a1435",
          btn: "rgb(98 84 243)",
          border: "rgba(98, 84, 243, 0.5)",
          hr: "#ffffff",
          gradient:
            "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
          shadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
          shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
        },
        media: {
          mobile: "768px",
          tab: "998px",
        },
      };
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
                        <Route path='/userprofile' element={<UserProfile/>}></Route>
                        <Route path='/orderpage' element={<OrderItems/>}></Route>
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