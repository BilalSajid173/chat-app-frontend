import classes from "./SinglePost.module.css";
import { Fragment, useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleComment from "./Comment";
import AuthContext from "../../store/auth-context";
import PostItem from "../AllPosts/PostItem";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { Image } from "cloudinary-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SinglePost = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const cmtRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch(
      "https://intelligent-fromage-47264.herokuapp.com/post/singlepost/" +
        postId,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const curPost = {
          author: data.post.author.name,
          content: data.post.content,
          createdAt: new Date(data.post.createdAt).toDateString(),
          id: data.post._id,
          author_id: data.post.author._id,
          imageId: data.post.publicId,
          userimgId: data.post.author.imageId,
        };
        setPost(curPost);
        setUser(data.user);
        setComments(data.post.comments);
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const savedposts = data.savedPosts ? data.savedPosts : [];
        const posts = data.posts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            isSaved: savedposts.includes(post._id) ? true : false,
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
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Failed to load post!",
          message: "Please try again.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token, postId]);

  const errorHandler = () => {
    setError(null);
  };

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const comment = cmtRef.current.value;
    if (comment.trim() === "") {
      return;
    }
    fetch(
      "https://intelligent-fromage-47264.herokuapp.com/post/addComment/" +
        postId,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          comment: comment,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments((prevState) => {
          return prevState.concat({
            name: data.name,
            comment: comment,
            _id: data._id,
          });
        });
        toast.success("Comment added!");
        cmtRef.current.value = "";
      })
      .catch((err) => {
        setError({
          title: "Comment not added!",
          message: "Please try again.",
        });
        cmtRef.current.value = "";
        console.log(err);
      });
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <Fragment>
          <div className={classes.container}>
            <div className={classes.postContainer}>
              <div className={classes.singlepost}>
                <div className={classes.userinfo}>
                  <div>
                    <Image
                      cloudName="dntn0wocu"
                      publicId={post.userimgId}
                      width="80"
                      height="80"
                      crop="scale"
                    />
                  </div>
                  <div>
                    <h3>{post.author}</h3>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
                <p>{post.content}</p>
                <div className={classes.uploadedimage}>
                  <Image
                    cloudName="dntn0wocu"
                    publicId={post.imageId}
                    width="300"
                    crop="scale"
                  />
                </div>
              </div>
            </div>
            <div className={classes.comments}>
              <h2>Comments</h2>
              <form onSubmit={commentSubmitHandler}>
                <input
                  type="text"
                  placeholder="Say Something!"
                  ref={cmtRef}
                  id="comment"
                />
                <button>Add</button>
              </form>
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <SingleComment
                      key={comment._id}
                      author={comment.name}
                      comment={comment.comment}
                    />
                  );
                })
              ) : (
                <p className={classes.nocom}>Be the first to comment!</p>
              )}
            </div>
          </div>
          <div className={classes.morePosts}>
            <h2>More Posts</h2>
            {allPosts.map((post) => (
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
                imageId={post.imageId}
                userimgId={post.userimgId}
                comments={post.comments}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SinglePost;
