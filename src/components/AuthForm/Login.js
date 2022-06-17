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
        <form onSubmit={formSubmitHandler}>
          <div className={classes.username}>
            <input
            placeholder="Username"
              type="email"
              id="email"
              autoComplete="off"
              required
              ref={emailInputRef}
            />
          </div>
          <div className={classes.password}>
            <input
            placeholder="Password"
              type="password"
              id="password"
              required
              ref={passwordInputRef}
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
