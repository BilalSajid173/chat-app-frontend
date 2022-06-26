import { useState, useContext } from "react";
import classes from "./PostItem.module.css";
import AuthContext from "../../store/auth-context";

const PostItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(props.isLiked);

  const onLikeChangeHandler = () => {
    fetch("http://localhost:8080/post/likepost/" + props.id, {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Liking post unsuccessful");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        setIsLiked((prevState) => {
          return !prevState;
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
