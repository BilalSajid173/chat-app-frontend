import { Fragment } from "react";
import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <Fragment>
      <div className={classes.msgcontfrom}>
        <span>
          {props.message}
          <span className={classes.time}>9:35 A.M.</span>
        </span>
      </div>
    </Fragment>
  );
};

export default Message;
