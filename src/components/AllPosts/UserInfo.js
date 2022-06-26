import classes from "./UserInfo.module.css";
import { Fragment } from "react";
import image from "../../images/userimg.png";
import { Link } from "react-router-dom";

const UserInfo = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <img src={image} alt="userimg"></img>
        <h2>Hey {props.name}!</h2>
        <div className={classes.buttons}>
          <Link className={classes.links} to="">
            <button>View Profile</button>
          </Link>
        </div>
        <div className={classes.buttons}>
          <Link className={classes.links} to="/add-post">
            <button>Add a Post</button>
          </Link>
        </div>
        <div className={classes.buttons}>
          <Link className={classes.links} to="">
            <button>Start a Chat</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
