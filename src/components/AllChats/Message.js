import { Fragment } from "react";
import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <Fragment>
      <div className={classes.msgcont}>
        <p>{props.message}</p>
      </div>
    </Fragment>
  );
};

export default Message;
