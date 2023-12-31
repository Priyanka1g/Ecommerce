import React from 'react';
import classes from './Navbar.module.css';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const { carts } = useSelector((state) => state.cart);
  
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.leftSection}>
          <ul className={classes.productsMenu}>
            <li>Ekart</li>
          </ul>
          <input
            type="text"
            className={classes.searchBar}
            placeholder="Search for products, brands and more... "
            onChange={(e) => props.getDataHandler(e.target.value)}
          />
        </div>
        <div className={classes.rightSection}>
        <NavLink to="/userprofile" className={classes.cartLink}>
            <button className={classes.button} color="primary">My Profile</button>
          </NavLink>
          <NavLink to="/" className={classes.cartLink}>
            <button className={classes.button} color="primary">Products</button>
          </NavLink>
          <button className={classes.button} onClick={props.onLogout}>
            Logout
          </button>
          <NavLink to="/cart" className={classes.cartLink}>
            <Badge badgeContent={carts.length} color="primary">
              <ShoppingCart />
            </Badge>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
