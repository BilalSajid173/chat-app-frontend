import { Fragment } from "react";
import classes from "./UserAccount.module.css";
import userimg from "../../images/userimg.png";
import { Link } from "react-router-dom";

const UserAccount = () => {
  return (
    <Fragment>
      <div className={classes.main_container}>
        <div className={classes.user_profile}>
          <div className={classes.userinfo}>
            <div className={classes.nameaddress}>
              <h1>Bilal Sajid</h1>
              <h4>San Francisco, California</h4>
              <p>bsajid173@gmail.com</p>
              <p>7310587987</p>
              <div className={classes.socials}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/bilal-sajid-5b1218219/"
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/BilalSajid173"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
            <div className={classes.actions}>
              <Link to="/friendlist">
                <i class="fa-solid fa-user-group"></i>
              </Link>
              <button>
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <Link to="">
                <i class="fa-solid fa-bookmark"></i>
              </Link>
            </div>
            <div className={classes.userimg}>
              <img src={userimg} alt="img"></img>
              <h4>Bio</h4>
              <p>
                Nec ullamcorper sit amet risus nullam eget felis. Integer vitae
                justo eget magna fermentum iaculis eu non diam. Laoreet sit amet
                cursus sit amet. Blandit turpis cursus in hac habitasse.
              </p>
            </div>
          </div>
          <div className={classes.userposts}></div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAccount;
