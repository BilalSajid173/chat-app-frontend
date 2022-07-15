import { Fragment } from "react";
import classes from "./LikeLoader.module.css";

const LikeLoader = () => {
  return (
    <Fragment>
      <div className={classes.center}>
        <div className={classes["lds-roller"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default LikeLoader;
