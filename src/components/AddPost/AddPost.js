import classes from "./AddPost.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";
import { Fragment, useContext, useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPost = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const navigate = useNavigate();

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
    if (!contentIsValid || !previewSource) {
      return;
    }
    setIsLoading(true);
    fetch("https://konnectapp.onrender.com/post/addpost", {
      method: "POST",
      body: JSON.stringify({
        content: enteredContent,
        image: previewSource,
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
        setIsLoading(false);
        navigate("/allposts");
        toast.success("Added Post!");
      })
      .catch((err) => {
        setError({
          title: "Failed to add post",
          message: "Please try again.",
        });
        setIsLoading(false);
        console.log(err);
      });
    resetContent();
  };

  const cancelHandler = () => {
    navigate("/allposts");
  };

  const errorHandler = () => {
    setError(null);
  };

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewSource(reader.result);
    };
  };

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
      {!error && isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <div className={classes.addPostWrapper}>
          <div className={classes.addpostform}>
            <button type="button" onClick={cancelHandler}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
            <form onSubmit={formSubmitHandler}>
              <div className={classes.imagepicker}>
                <label htmlFor="upload-photo">
                  <span>Choose</span>
                </label>
                <p>Select an image</p>
                <input
                  type="file"
                  name="photo"
                  id="upload-photo"
                  className={classes.uploadphoto}
                  onChange={fileInputHandler}
                  value={fileInputState}
                />
              </div>
              <div className={classes.imgprev}>
                {previewSource ? (
                  <img src={previewSource} alt="preview_img"></img>
                ) : (
                  "No Image Selected"
                )}
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
      )}
    </Fragment>
  );
};

export default AddPost;
