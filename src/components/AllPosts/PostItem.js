import { useState, useContext, Fragment } from "react";
import classes from "./PostItem.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import ErrorModal from "../UI/ErrorModal";
import CommentModal from "../UI/CommentModal";
import SingleComment from "../SinglePost/Comment";
import { Image } from "cloudinary-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LikeLoader from "../UI/LikeLoader";

const PostItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [error, setError] = useState();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLikeChangeHandler = (like) => {
    setIsLoading(true);
    fetch(
      `https://intelligent-fromage-47264.herokuapp.com/post/${
        like ? "likepost" : "savepost"
      }/` + props.id,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Liking post unsuccessful");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        like
          ? setIsLiked((prevState) => {
              !prevState && toast.success("Post liked");
              return !prevState;
            })
          : setIsSaved((prevState) => {
              !prevState && toast.success("Post saved");
              return !prevState;
            });
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Liking post unsuccessful",
          message: "Please try again.",
        });
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchComments = () => {
    setIsLoading(true);
    fetch(
      "https://intelligent-fromage-47264.herokuapp.com/post/getComments/" +
        props.id,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Comments not fetched");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data.comments);
        setShowComments(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Liking post unsuccessful",
          message: "Please try again.",
        });
        console.log(err);
        setIsLoading(false);
      });
  };

  const hideComments = () => {
    setShowComments(false);
  };

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
      {!error && isLoading && <LikeLoader />}
      {!isLoading && showComments && (
        <CommentModal onClose={hideComments}>
          <button onClick={hideComments} className={classes.close}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>All Comments</h2>
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
            <p className={classes.nocomments}>No comments yet!</p>
          )}
        </CommentModal>
      )}
      <div className={classes.postbg}>
        <div className={classes.postContainer}>
          <div className={classes.singlepost}>
            <div className={classes.userinfo}>
              <div>
                <Image
                  cloudName="dntn0wocu"
                  publicId={props.userimgId}
                  width="50"
                  height="50"
                  crop="scale"
                />
              </div>
              <div>
                <h4>
                  {props.userId === props.authorId ? (
                    <Link to="/user_account" className={classes.link}>
                      {props.author}
                    </Link>
                  ) : (
                    <Link
                      to={`/user/${props.authorId}`}
                      className={classes.link}
                    >
                      {props.author}
                    </Link>
                  )}
                </h4>
                <span>{props.createdAt}</span>
              </div>
              <div className={classes.bookmark}>
                <i
                  onClick={onLikeChangeHandler.bind(null, false)}
                  className={`${
                    isSaved ? "fa-solid" : "fa-regular"
                  } fa-bookmark`}
                ></i>
              </div>
            </div>
            <p>
              {props.content}
              <Link
                className={classes.viewpostlink}
                to={`/singlepost/${props.id}`}
              >
                Read More
              </Link>
            </p>
          </div>
          {props.imageId && (
            <div className={classes.uploadedimage}>
              <Image
                cloudName="dntn0wocu"
                publicId={props.imageId}
                width="300"
                crop="scale"
              />
            </div>
          )}
          <div className={classes.actions}>
            <button onClick={onLikeChangeHandler.bind(null, true)}>
              {!isLiked && (
                <span className="material-symbols-outlined">favorite</span>
              )}
              {isLiked && (
                <i className={`fa-solid fa-heart ${classes.likebutton}`}></i>
              )}
              {isLiked ? "Liked" : "Like"}
            </button>
            <button onClick={fetchComments}>
              <span className="material-symbols-outlined">comment</span>
              {props.comments === 1
                ? props.comments + " Comment"
                : props.comments + " Comments"}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostItem;
