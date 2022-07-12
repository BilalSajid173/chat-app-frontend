import classes from "./UserInfo.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const UserInfo = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <Image
          cloudName="dntn0wocu"
          publicId={props.userimgId}
          width="150"
          height="150"
          crop="scale"
        />
        <h2>Hey {props.name}!</h2>
        <div className={classes.buttons}>
          <Link className={classes.links} to="/user_account">
            <button>View Profile</button>
          </Link>
        </div>
        <div className={classes.buttons}>
          <Link className={classes.links} to="/add-post">
            <button>Add a Post</button>
          </Link>
        </div>
        <div className={classes.buttons}>
          <Link className={classes.links} to="/allchats">
            <button>Chat</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
