import classes from "./AddPost.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const AddPost = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!titleIsValid || !contentIsValid) {
      return;
    }
    console.log(enteredTitle, enteredContent);
    fetch("http://localhost:8080/post/addpost", {
      method: "POST",
      body: JSON.stringify({
        title: enteredTitle,
        content: enteredContent,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Post Creation failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/allposts");
      })
      .catch((err) => {
        console.log(err);
      });
    resetTitle();
    resetContent();
  };

  const cancelHandler = () => {
    navigate("/allposts");
  };

  const titleClasses = titleHasError ? classes.invalid : "";
  const contentClasses = contentHasError ? classes.invalid : "";
  return (
    <div className={classes.addPostWrapper}>
      <div className={classes.addpostform}>
        <form onSubmit={formSubmitHandler}>
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
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
