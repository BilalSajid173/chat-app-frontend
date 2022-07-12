import classes from "./FriendList.module.css";
import { Fragment } from "react";
import SingleFriend from "./SingleFriend";

const FriendSection = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <h2>Your Friends</h2>
        {props.friends.map((friend) => (
          <SingleFriend
            key={friend._id}
            name={friend.name}
            id={friend._id}
            userimgId={friend.imageId}
            address={friend.address}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default FriendSection;
