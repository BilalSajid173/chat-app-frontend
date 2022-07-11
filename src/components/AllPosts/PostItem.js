import { useState, useContext, Fragment } from "react";
import classes from "./PostItem.module.css";
import AuthContext from "../../store/auth-context";
import image from "../../images/userimg.png";
import { Link } from "react-router-dom";
import ErrorModal from "../UI/ErrorModal";
import CommentModal from "../UI/CommentModal";
import SingleComment from "../SinglePost/Comment";
import { Image } from "cloudinary-react";

const PostItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [error, setError] = useState();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const onLikeChangeHandler = (like) => {
    fetch(
      `http://localhost:8080/post/${like ? "likepost" : "savepost"}/` +
        props.id,
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
              return !prevState;
            })
          : setIsSaved((prevState) => {
              return !prevState;
            });
        console.log(data);
      })
      .catch((err) => {
        setError({
          title: "Liking post unsuccessful",
          message: "Please try again.",
        });
        console.log(err);
      });
  };

  const fetchComments = () => {
    setShowComments(true);
    fetch("http://localhost:8080/post/getComments/" + props.id, {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
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
      })
      .catch((err) => {
        setError({
          title: "Liking post unsuccessful",
          message: "Please try again.",
        });
        console.log(err);
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
      {showComments && (
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
                <img src={image} alt="img"></img>
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
              Comments
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostItem;
