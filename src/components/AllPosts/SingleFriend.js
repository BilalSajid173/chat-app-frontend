import { Fragment } from "react";
import classes from "./SingleFriend.module.css";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const SingleFriend = (props) => {
  return (
    <Fragment>
      <Link to={`/user/${props.id}`} className={classes.link}>
        <div className={classes.friend}>
          <Image
            cloudName="dntn0wocu"
            publicId={props.userimgId}
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

export default SingleFriend;
