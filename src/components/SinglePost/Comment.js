import classes from "./Comment.module.css";

const SingleComment = (props) => {
  return (
    <div className={classes.comment}>
      <h5>{props.author}</h5>
      <p>{props.comment}</p>
    </div>
  );
};

export default SingleComment;
