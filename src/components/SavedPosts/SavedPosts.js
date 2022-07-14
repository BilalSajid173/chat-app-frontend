import { useEffect, useContext, useState, Fragment } from "react";
import classes from "./SavedPosts.module.css";
import AuthContext from "../../store/auth-context";
import PostItem from "../AllPosts/PostItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";

const SavedPosts = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/post/savedpost", {
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
        console.log(data);
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const posts = data.user.savedPosts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            isSaved: true,
            id: post._id,
            author: post.author.name,
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author._id,
            title: post.title,
            imageId: post.publicId,
            userimgId: post.author.imageId,
            comments: post.comments.length,
          };
        });
        setAllPosts(posts);
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Failed to load Chats",
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
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {!error && isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <div className={classes.container}>
          <div className={classes.heading}>
            <h1>Saved Posts</h1>
          </div>
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <PostItem
                title={post.title}
                userId={user._id}
                isLiked={post.isLiked}
                isSaved={post.isSaved}
                authorId={post.authorId}
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                createdAt={post.createdAt}
                imageId={post.imageId}
                userimgId={post.userimgId}
                comments={post.comments}
              />
            ))
          ) : (
            <div className={classes.nosaved}>
              <h2>No saved posts.</h2>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default SavedPosts;
