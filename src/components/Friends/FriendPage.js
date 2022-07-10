import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./FriendPage.module.css";
import SingleFriend from "../AllPosts/SingleFriend";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import PostItem from "../AllPosts/PostItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const FriendPage = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/post/friendlist/", {
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
        setFriends(data.user.friends);
        const likedposts = data.user.likedPosts ? data.user.likedPosts : [];
        const savedposts = data.user.savedPosts ? data.user.savedPosts : [];
        let allPosts = [];
        data.user.friends.forEach((friend) => {
          friend.posts.forEach((post) => {
            allPosts.push(post);
          });
        });
        allPosts.sort((a, b) => 0.5 - Math.random());
        setPosts(
          allPosts.map((post) => {
            return {
              isLiked: likedposts.includes(post._id) ? true : false,
              isSaved: savedposts.includes(post._id) ? true : false,
              id: post._id,
              author: post.author.name,
              content: post.content.slice(0, 250) + "...",
              createdAt: new Date(post.createdAt).toDateString(),
              authorId: post.author._id,
              title: post.title,
            };
          })
        );
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Failed to load posts",
          message: "Please try again later.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && !isLoading && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <Fragment>
          <div className={classes.mobile}>
            <div className={classes.listcontainer}>
              <h2>Your Friends</h2>
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <SingleFriend
                    key={friend._id}
                    name={friend.name}
                    id={friend._id}
                  />
                ))
              ) : (
                <p className={classes.nofriends}>
                  You Have No Friends..kinda sad, innit?
                </p>
              )}
            </div>
          </div>
          <div className={classes.container}>
            <h2>Recent Posts</h2>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItem
                  userId={user._id}
                  isLiked={post.isLiked}
                  isSaved={post.isSaved}
                  authorId={post.authorId}
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  createdAt={post.createdAt}
                  title={post.title}
                />
              ))
            ) : (
              <p className={classes.nopost}>No Recent Posts</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FriendPage;
