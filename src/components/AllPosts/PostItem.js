import classes from "./PostItem.module.css";

const PostItem = (props) => {
    return <div className={classes.singlepost}>
        <h5>{props.author}</h5>
        <p>{props.content}</p>
        <p>{props.createdAt}</p>
        <div className={classes.actions}>
            <button>like</button>
            <button>Comments</button>
        </div>
    </div>
};

export default PostItem;
