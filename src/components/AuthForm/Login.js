import { useRef, Fragment } from "react";
import classes from "./Login.module.css";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail, enteredPassword);
  };
  return (
    <Fragment>
      <div className={classes.logincontainer}>
        <form onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              required
              ref={emailInputRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
