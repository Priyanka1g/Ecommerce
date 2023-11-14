
import React, { useState } from 'react'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Cart from './components/Cart';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import toast, {Toaster} from 'react-hot-toast';
import Footer from './components/Footer';
import CardDetails from './components/CardDetails';
import { useEffect } from 'react';
function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const loginHandler = (email, password)=>{
    //     setIsLoggedIn(true)
    // }

    useEffect(() => {
        // Check if the user is already logged in from local storage
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
    
        if (storedEmail && storedPassword) {
          setIsLoggedIn(true);
        }
      }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
    
        setIsLoggedIn(true);
      };

    const logoutHandler= ()=>{
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        setIsLoggedIn(false)
    }
    return(
        <>
         {isLoggedIn ? (
        <>
          <Navbar onLogout={logoutHandler} />
          <Routes>
            <Route path='/' element={<Cards />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/details/:id' element={<CardDetails />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      ) : (
        <Login onLogin={loginHandler} />
      )}
        </>
    )
}

export default App