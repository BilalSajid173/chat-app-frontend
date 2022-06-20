import classes from "./AddPost.module.css";
import useInput from "../../hooks/use-input";

const AddPost = () => {
  return (
    <div className={classes.addPostWrapper}>
      <div className={classes.addpostform}>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
          </div>
          <div>
            <label htmlFor="content">What do you wanna say?</label>
            <textarea rows="8" name="content" id="content"></textarea>
          </div>
          <div className={classes.actions}>
            <button type="submit">Add Post</button>
            <button>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
