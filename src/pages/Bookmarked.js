import { Fragment } from "react";
import Navbar from "../components/Navbar/navbar";
import SavedPosts from "../components/SavedPosts/SavedPosts";

const Bookmarked = () => {
  return (
    <Fragment>
      <Navbar />
      <SavedPosts />
    </Fragment>
  );
};

export default Bookmarked;
