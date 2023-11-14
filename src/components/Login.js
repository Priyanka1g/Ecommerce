import { useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);

    // Redirect to home page after successful login
    navigate("/");
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 6
    );
  };

  const validEmailHandler = (event) => {
    setEnteredEmailIsValid(enteredEmail.includes("@"));
  };

  const validPasswordHandler = (event) => {
    setEnteredPasswordIsValid(enteredPassword.trim().length > 6);
  };

  return (
    <div className={classes.loginContainer}>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              enteredEmailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              enteredPasswordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validPasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
