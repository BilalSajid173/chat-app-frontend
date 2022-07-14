import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import image from "../../images/login.jpg";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState();

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
    fetch("https://intelligent-fromage-47264.herokuapp.com/auth/login", {
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Please try again");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        authCtx.login(data.name, data.token, expiryDate.toISOString());
        toast.success("Login Successful!");
        navigate("/allposts?page=1");
      })
      .catch((err) => {
        setError({
          title: "Login Failed!",
          message: "Please try again.",
        });
        console.log(err);
      });
    resetEmail();
    resetPassword();
  };

  const errorHandler = () => {
    setError(null);
  };

  const showPassword = () => {
    setShowPass((prev) => {
      return !prev;
    });
  };

  const emailClasses = emailHasError ? classes.invalid : "";
  const passwordClasses = passwordHasError ? classes.invalid : "";
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className={classes.bodygradient}>
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
                <div className={classes.showpasswrap}>
                  <input
                    placeholder="Password"
                    type={showPass ? "text" : "password"}
                    id="password"
                    required
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                  />
                  <i
                    onClick={showPassword}
                    className={`fa-solid ${
                      showPass ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </div>
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
      </div>
    </Fragment>
  );
};

export default LoginForm;
