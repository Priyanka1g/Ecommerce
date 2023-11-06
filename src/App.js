
import React, { useState } from 'react'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Cart from './components/Cart';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import toast, {Toaster} from 'react-hot-toast';
function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password)=>{
        setIsLoggedIn(true)
    }

    const logoutHandler= ()=>{
        setIsLoggedIn(false)
    }
    return(
        <>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Navbar  onLogout = {logoutHandler}/>}
        <Routes>
          <Route path='/' exact element={<Cards/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
        </Routes>
        <Toaster/>
        </>
    )
}

export default App