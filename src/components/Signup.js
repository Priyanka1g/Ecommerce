import React, { useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSignup(enteredName, enteredEmail, enteredPassword);
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
    <div className={classes.signupContainer} style={{ backgroundImage: 'url("1.jpg")', backgroundSize: 'cover' }}>
      <Grid container justifyContent="center" className={classes.grid}>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Card className={classes.signup}>
            <Typography variant="h5" className={classes.title}>
              Signup
            </Typography>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
