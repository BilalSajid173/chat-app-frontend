import classes from "./AllPosts.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostItem from "./PostItem";
import UserInfo from "./UserInfo";
import FriendSection from "./FriendSection";
import AuthContext from "../../store/auth-context";

const AllPosts = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/post/allposts", {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Getting Posts Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        const posts = data.posts.map((post) => {
          return {
            id: post._id,
            author: post.author.name,
            content: post.content,
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author._id,
          };
        });
        setAllPosts(posts);
        setUser(data.user.name);
        console.log(data);
      })
      .catch();
  }, [authCtx.token]);

  return (
    <Fragment>
      <UserInfo name={user} />
      <FriendSection />
      <div className={classes.container}>
        {allPosts.map((post) => (
          <PostItem
            authorId={post.authorId}
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default AllPosts;
