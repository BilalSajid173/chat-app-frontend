import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import image from "../../images/login.jpg";
import useInput from "../../hooks/use-input";

const LoginForm = (props) => {
  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 7);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    console.log(enteredEmail, enteredPassword);
    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError ? classes.invalid : "";
  const passwordClasses = passwordHasError ? classes.invalid : "";
  return (
    <Fragment>
      <div className={classes.maincontainer}>
        <div className={classes.logincontainer}>
          <h2>Sign In</h2>
          <form onSubmit={formSubmitHandler} noValidate>
            <div className={emailClasses}>
              {emailHasError && (
                <p className={classes.error}>Please Enter a valid email.</p>
              )}
              <input
                placeholder="Username"
                type="email"
                id="email"
                autoComplete="off"
                required
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </div>
            <div className={passwordClasses}>
              {passwordHasError && (
                <p className={classes.error}>
                  Min passsword length is 7 characters.
                </p>
              )}
              <input
                placeholder="Password"
                type="password"
                id="password"
                required
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
            </div>
            <button type="submit">Sign In</button>
            <h4>
              Not a member? <Link to="/signup">Sign Up</Link>
            </h4>
          </form>
        </div>
        <div className={classes.loginimg}>
          <img src={image} alt="img" />
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
