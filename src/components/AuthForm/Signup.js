import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import image from "../../images/login.jpg";
import useInput from "../../hooks/use-input";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 7);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid || !nameIsValid) {
      return;
    }
    fetch("http://localhost:8080/auth/signup/", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Something went wrong");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    resetName();
    resetEmail();
    resetPassword();
  };

  const nameClasses = nameHasError ? classes.invalid : "";
  const emailClasses = emailHasError ? classes.invalid : "";
  const passwordClasses = passwordHasError ? classes.invalid : "";
  return (
    <Fragment>
      <div className={classes.bodygradient}>
        <div className={classes.maincontainer}>
          <div className={classes.logincontainer}>
            <h2>Create Account</h2>
            <form onSubmit={formSubmitHandler} noValidate>
              <div className={nameClasses}>
                {nameHasError && (
                  <p className={classes.error}>Please Enter a name.</p>
                )}
                <input
                  placeholder="Name"
                  type="text"
                  id="name"
                  autoComplete="off"
                  required
                  value={enteredName}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                />
              </div>
              <div className={emailClasses}>
                {emailHasError && (
                  <p className={classes.error}>Please Enter a valid email.</p>
                )}
                <input
                  placeholder="Email"
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
              <button type="submit">Sign Up</button>
              <h4>
                Already a member? <Link to="/">Log In</Link>
              </h4>
            </form>
          </div>
          <div className={classes.loginimg}>
            <img src={image} alt="img" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignupForm;
