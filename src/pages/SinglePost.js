import { Fragment } from "react";
import SinglePost from "../components/SinglePost/SinglePost";
import Navbar from "../components/Navbar/navbar";

const ViewPost = () => {
  return (
    <Fragment>
      <Navbar />
      <SinglePost />
    </Fragment>
  );
};

export default ViewPost;
