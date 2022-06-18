import { Fragment, useState } from "react";
import classes from "./Login.module.css";
import image from "../../images/login.jpg";

const LoginForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailIsValid = enteredEmail.includes("@");
  const emailHasError = !emailIsValid && emailTouched;

  const passwordIsValid = enteredPassword.trim().length >= 7;
  const passwordHasError = !passwordIsValid && passwordTouched;

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    console.log(enteredEmail, enteredPassword);
    setEmailTouched(false);
    setPasswordTouched(false);
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const emailClasses = emailHasError ? classes.invalid : "";
  const passwordClasses = passwordHasError ? classes.invalid : "";
  return (
    <Fragment>
      <div className={classes.maincontainer}>
        <div className={classes.logincontainer}>
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
            <button type="submit">Login</button>
            <h4>New here? SignUp</h4>
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
