import { Fragment } from "react";
import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <Fragment>
      <div className={props.to ? classes.msgcontto : classes.msgcontfrom}>
        <span>
          {props.message}
        </span>
      </div>
    </Fragment>
  );
};

export default Message;
