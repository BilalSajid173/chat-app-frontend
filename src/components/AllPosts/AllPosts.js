import classes from "./AllPosts.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostItem from "./PostItem";
import UserInfo from "./UserInfo";
import FriendSection from "./FriendSection";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";

const AllPosts = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [friendlist, setFriendlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/post/allposts/", {
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
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const posts = data.posts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            id: post._id,
            author: post.author.name,
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author._id,
          };
        });
        setFriendlist(data.user.friends);
        setAllPosts(posts);
        setUser(data.user);
      })
      .catch((err) => {
        setError({
          title: "Failed to load posts",
          message: "Please try again later.",
        });
        console.log(err);
      });
  }, [authCtx.token]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {!error && <UserInfo name={user.name} />}
      {!error && <FriendSection friends={friendlist} />}
      {!error && (
        <div className={classes.container}>
          {allPosts.map((post) => (
            <PostItem
              userId={user._id}
              isLiked={post.isLiked}
              authorId={post.authorId}
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default AllPosts;
