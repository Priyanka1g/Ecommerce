import React from 'react'
import classes from './Navbar.module.css'
import SearchButton from './SearchButton'
import { Button } from '@mui/material'
import TagButton from './TagButton'
import Cards from './Cards'
import {Badge} from '@mui/material'
// import { ShoppingBag } from '@mui/icons-material'
import { ShoppingCart } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const Navbar = (props) => {

   const {carts} = useSelector((state)=>state.cart)
   console.log(carts)
    const getDataHandler = (input) => {
        // console.log(data);
        // props.onInputData(input);
    }
    return (
        <>
<header className={classes.header}>
      <div className={classes.leftSection}>
        {/* Products Menu */}
        <ul className={classes.productsMenu}>
          <li>Ekart</li>
          {/* Add more products as needed */}
        </ul>
      </div>
      <NavLink to="/">
      <Button>Products</Button>
      </NavLink>
      <TagButton/>
      <SearchButton onInputData={getDataHandler} />
      <div className={classes.rightSection}>
        {/* Login and Signup Buttons */}
        <button className={classes.button}  onClick={props.onLogout}>Logout</button>
        {/* <button className={classes.button}>Signup</button> */}
      </div>
      {/* <h3>CARt{carts.length}</h3> */}
      <NavLink to="/cart">
      <Badge badgeContent={carts.length} color="primary">
            <ShoppingCart />
          </Badge>
          </NavLink>
    </header>
    </>
    )
}

export default Navbar