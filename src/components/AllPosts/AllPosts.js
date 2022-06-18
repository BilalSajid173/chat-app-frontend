import classes from "./AllPosts.module.css";
import { Fragment } from "react";
import PostItem from "./PostItem";

const dummyposts = [
  { id: "1", author: "Bilal Sajid", content: "This is my first post!!" },
  { id: "2", author: "Nasrul Huda", content: "That is a good post Bilal" },
];

const AllPosts = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        {dummyposts.map((post) => (
          <PostItem id={post.id} author={post.author} content={post.content} />
        ))}
      </div>
    </Fragment>
  );
};

export default AllPosts;
