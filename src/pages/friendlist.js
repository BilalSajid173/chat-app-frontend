import React from "react";
import FriendList from "../components/friendlist/friendlist";
import Navbar from "../components/Navbar/navbar";

const friendlist = (props) => {
  return (
    <>
      <Navbar />
      <FriendList />
    </>
  );
};

export default friendlist;
