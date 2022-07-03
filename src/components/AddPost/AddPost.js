import classes from "./AddPost.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";
import { Fragment, useContext, useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddPost = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
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
        setError({
          title: "Failed to add post",
          message: "Please try again.",
        });
        console.log(err);
      });
    resetTitle();
    resetContent();
  };

  const cancelHandler = () => {
    navigate("/allposts");
  };

  const errorHandler = () => {
    setError(null);
  };

  const titleClasses = titleHasError ? classes.invalid : "";
  const contentClasses = contentHasError ? classes.invalid : "";
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className={classes.addPostWrapper}>
        <div className={classes.addpostform}>
          <button type="button" onClick={cancelHandler}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
          <form onSubmit={formSubmitHandler}>
            <div className={titleClasses}>
              {titleHasError && <p className={classes.error}>Enter Title</p>}
              <input
                id="title"
                name="title"
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                placeholder="Title"
              />
            </div>
            <div className={contentClasses}>
              {contentHasError && (
                <p className={classes.error}>Dont leave this empty</p>
              )}
              <textarea
                rows="8"
                name="content"
                id="content"
                value={enteredContent}
                onChange={contentChangeHandler}
                onBlur={contentBlurHandler}
                placeholder="What's on your mind?"
              ></textarea>
            </div>
            <div className={classes.actions}>
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPost;
