import React, { Fragment } from "react";
import Navbar from "../components/Navbar/navbar";
import FriendPage from "../components/Friends/FriendPage";

const FriendList = (props) => {
  return (
    <Fragment>
      <Navbar />
      <FriendPage />
    </Fragment>
  );
};

export default FriendList;
