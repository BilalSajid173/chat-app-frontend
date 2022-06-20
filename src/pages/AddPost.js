import { Fragment } from "react";
import AddPost from "../components/AddPost/AddPost";
import Navbar from "../components/Navbar/navbar";

const AddNewPost = () => {
  return (
    <Fragment>
      <Navbar />
      <AddPost />
    </Fragment>
  );
};

export default AddNewPost;
