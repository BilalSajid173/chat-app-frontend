import { useRef, Fragment } from "react";
import classes from "./Login.module.css";
import image from "../../images/login.jpg"

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
     <div className={classes.maincontainer}>            
      <div className={classes.logincontainer}>
        <h3>Create Account</h3>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.Username}>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              required
              ref={emailInputRef}
            />
          </div>
          <div className={classes.password}>
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
      <div className={classes.loginimg}>
        <img src={image} alt="img" />
      </div>
     </div>      
      
    </Fragment>
  );
};

export default LoginForm;
