import classes from "./PostItem.module.css";

const PostItem = (props) => {
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
            <button>
              <span className="material-symbols-outlined">favorite</span>
              Like
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
