import { useEffect, useContext, useState, Fragment } from "react";
import classes from "./SavedPosts.module.css";
import AuthContext from "../../store/auth-context";
import PostItem from "../AllPosts/PostItem";

const SavedPosts = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/post/savedposts", {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token]);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SavedPosts;
