// Login.js

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = (props) => {
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);

    // Redirect to home page after successful login
    navigate('/');
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    validateForm();
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    validateForm();
  };

  const validateForm = () => {
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  };

  return (
    <div className={classes.loginContainer}>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className={classes.signupLink}>
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
