import React from "react";
import friendList from "../components/friendlist/friendlist";
import Navbar from "../components/Navbar/navbar";

const Friendlist = (props) => {
  return (
    <>
      <Navbar />
      <friendList />
    </>
  );
};

export default Friendlist;
