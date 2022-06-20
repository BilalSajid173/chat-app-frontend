import classes from "./AddPost.module.css";
import useInput from "../../hooks/use-input";

const AddPost = () => {
  const {
    value: enteredTitle,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    onBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredContent,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    onBlurHandler: contentBlurHandler,
    isValid: contentIsValid,
    reset: resetContent,
  } = useInput((value) => value.trim() !== "");

  const titleClasses = titleHasError ? classes.invalid : "";
  const contentClasses = contentHasError ? classes.invalid : "";
  return (
    <div className={classes.addPostWrapper}>
      <div className={classes.addpostform}>
        <form>
          <div className={titleClasses}>
            <label htmlFor="title">Title</label>
            {titleHasError && (
              <p className={classes.error}>Please Enter a title.</p>
            )}
            <input
              id="title"
              name="title"
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
          </div>
          <div className={contentClasses}>
            <label htmlFor="content">What do you wanna say?</label>
            {contentHasError && (
              <p className={classes.error}>Please Enter some content.</p>
            )}
            <textarea
              rows="8"
              name="content"
              id="content"
              value={enteredContent}
              onChange={contentChangeHandler}
              onBlur={contentBlurHandler}
            ></textarea>
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
