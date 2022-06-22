import classes from "./PostItem.module.css";

const PostItem = (props) => {
    return (
        <>
        <div className={classes.postbg}>
            <div className={classes.postContainer}>
                <div className={classes.singlepost}>
                    <h3>{props.author}</h3>
                    <p>{props.content}</p>
                    <p>{props.createdAt}</p>
                </div>
                <div className={classes.actions}>
                    <div className={classes.like}>
                        <button>
                            <span class="material-symbols-outlined">
                                favorite
                            </span>
                                Like
                        </button>
                    </div>
                    <div className={classes.comment}>
                        <button>
                            <span class="material-symbols-outlined">
                                comment
                            </span>
                                Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PostItem;
