import { Fragment } from "react";
import classes from "./SingleFriend.module.css";
import image from "../../images/userimg.png";
import { Link } from "react-router-dom";

const SingleFriend = (props) => {
  return (
    <Fragment>
      <Link to={`/user/${props.id}`} className={classes.link}>
        <div className={classes.friend}>
          <img src={image} alt="userimage"></img>
          <h3>{props.name}</h3>
        </div>
      </Link>
    </Fragment>
  );
};

export default SingleFriend;