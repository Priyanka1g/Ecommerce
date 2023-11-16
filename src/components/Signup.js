// Signup.js

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = (props) => {
  const navigate = useNavigate();

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSignup(enteredName, enteredEmail, enteredPassword);

    // Redirect to home page after successful signup
    navigate('/');
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
    validateForm();
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
    setFormIsValid(
      enteredName.trim().length > 0 &&
        enteredEmail.includes('@') &&
        enteredPassword.trim().length > 6
    );
  };

  return (
    <div className={classes.signupContainer}>
      <Card className={classes.signup}>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control}`}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={enteredName} onChange={nameChangeHandler} />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} />
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
              Signup
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
