import { useState } from "react";
import classes from "./PostItem.module.css";

const PostItem = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const onLikeChangeHandler = () => {
    setIsLiked((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <div className={classes.postbg}>
        <div className={classes.postContainer}>
          <div className={classes.singlepost}>
            <h3>{props.author}</h3>
            <p>{props.content}</p>
            <span>{props.createdAt}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={onLikeChangeHandler}>
              {!isLiked && (
                <span className="material-symbols-outlined">favorite</span>
              )}
              {isLiked && (
                <i className={`fa-solid fa-heart ${classes.likebutton}`}></i>
              )}
              {isLiked ? "Liked" : "Like"}
            </button>
            <button>
              <span className="material-symbols-outlined">comment</span>
              Comments
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
