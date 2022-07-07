import { Fragment } from "react";
import classes from "./ChatItem.module.css";
import image from "../../images/userimg.png";
import { Link } from "react-router-dom";

const ChatItem = (props) => {
  return (
    <Fragment>
      <Link to={`/chat/${props.id}`} className={classes.link}>
        <div className={classes.chatcontainer}>
          <img src={image} alt="img"></img>
          <h3>{props.name}</h3>
        </div>
      </Link>
    </Fragment>
  );
};

export default ChatItem;
