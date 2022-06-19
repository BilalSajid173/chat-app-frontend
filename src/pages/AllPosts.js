import React from "react";
import AllPosts from "../components/AllPosts/AllPosts";
import Navbar from "../components/Navbar/navbar";

const FetchAllPosts = (props) => {
  return (
    <>
      <Navbar />
      <AllPosts />
    </>
  );
};

export default FetchAllPosts;
