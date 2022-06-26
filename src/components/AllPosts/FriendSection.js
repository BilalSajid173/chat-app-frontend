import classes from "./FriendList.module.css";
import { Fragment } from "react";
import image from "../../images/userimg.png";

const FriendSection = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <h2>Your Friends</h2>
        <div className={classes.friend}>
          <img src={image} alt="userimage"></img>
          <h3>Bilal Sajid</h3>
        </div>
        <div className={classes.friend}>
          <img src={image} alt="userimage"></img>
          <h3>Nasrul Huda</h3>
        </div>
        <div className={classes.friend}>
          <img src={image} alt="userimage"></img>
          <h3>Iron Man</h3>
        </div>
        <div className={classes.friend}>
          <img src={image} alt="userimage"></img>
          <h3>Captain America</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default FriendSection;
