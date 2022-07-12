import { Fragment } from "react";
import classes from "./ChatItem.module.css";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const ChatItem = (props) => {
  return (
    <Fragment>
      <Link
        to={`/chat/${props.roomId}/${props.userId}`}
        className={classes.link}
      >
        <div className={classes.chatcontainer}>
          <Image
            cloudName="dntn0wocu"
            publicId={props.imageId}
            width="50"
            height="50"
            crop="scale"
          />
          <div>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default ChatItem;
