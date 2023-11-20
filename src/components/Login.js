// Login.js
import React, { useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';
const Login = (props) => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
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
    <div className={classes.loginContainer} style={{ backgroundImage: 'url("1.jpg")', backgroundSize: 'cover' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Card className={classes.login}>
            <Typography variant="h5" className={classes.title}>
              Login
            </Typography>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
