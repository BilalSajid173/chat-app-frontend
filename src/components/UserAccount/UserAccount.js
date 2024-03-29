import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./UserAccount.module.css";
import { Link } from "react-router-dom";
import PostItem from "../AllPosts/PostItem";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import EditProfile from "./EditProfile";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ProfilePicModal from "../UI/ProfilePicModal";
import { Image } from "cloudinary-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAccount = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [imageId, setImageId] = useState("");

  useEffect(() => {
    fetch("https://konnectapp.onrender.com/post/account/", {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const savedposts = data.savedPosts ? data.savedPosts : [];
        const posts = data.posts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            isSaved: savedposts.includes(post._id) ? true : false,
            id: post._id,
            author: data.user.name,
            content: post.content.slice(0, 150) + "...",
            createdAt: post.createdAt,
            authorId: post.author,
            title: post.title,
            imageId: post.publicId,
            comments: post.comments.length,
          };
        });
        setAllPosts(posts);
        setUser(data.user);
        setImageId(data.user.imageId);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Profile not loaded!",
          message: "Please try again.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token]);

  const errorHandler = () => {
    setError(null);
  };

  const editFormHandler = () => {
    setEdit(true);
  };

  const editSetUser = (userData) => {
    setUser(userData);
  };

  const closeEditForm = () => {
    setEdit(false);
  };

  const showModalForm = () => {
    setShowModal(true);
  };

  const closeModalForm = () => {
    setShowModal(false);
    setFileInputState("");
    setPreviewSource("");
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

  const imageSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!previewSource) return;
    fetch("https://konnectapp.onrender.com/post/addimage", {
      method: "POST",
      body: JSON.stringify({
        image: previewSource,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImageId(data.publicId);
        setShowModal(false);
        setFileInputState("");
        setPreviewSource("");
        setIsLoading(false);
        toast.success("Photo updated!");
      })
      .catch((err) => {
        setError({
          title: "Profile not loaded!",
          message: "Please try again.",
        });
        console.log(err);
      });
  };

  return (
    <Fragment>
      {edit && (
        <EditProfile
          saveEdit={editSetUser}
          onClick={closeEditForm}
          closeForm={closeEditForm}
        />
      )}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {showModal && (
        <ProfilePicModal onClose={closeModalForm}>
          <form onSubmit={imageSubmitHandler}>
            <div className={classes.imagepicker}>
              <label htmlFor="upload-photo">
                <span>Choose</span>
              </label>
              <p>Select an image</p>
              <input
                type="file"
                name="photo"
                id="upload-photo"
                className={classes.upload}
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
            <div className={classes.modalbtns}>
              <button>Submit</button>
              <button type="button" onClick={closeModalForm}>
                Close
              </button>
            </div>
          </form>
        </ProfilePicModal>
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <div className={classes.main_container}>
          <div className={classes.user_profile}>
            <div className={classes.userinfo}>
              <div className={classes.nameaddress}>
                <h1>{user.name}</h1>
                {user.address && <h4>{user.address}</h4>}
                <p>{user.email}</p>
                {user.number && <p>{user.number}</p>}
                <div className={classes.socials}>
                  {user.linkedIn && (
                    <a rel="noreferrer" target="_blank" href={user.linkedIn}>
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  )}
                  {user.github && (
                    <a rel="noreferrer" target="_blank" href={user.github}>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  )}
                </div>
              </div>
              <div className={classes.actions}>
                <Link to="/friendlist">
                  <i className="fa-solid fa-user-group"></i>
                </Link>
                <button onClick={editFormHandler}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <Link to="/bookmarked">
                  <i className="fa-solid fa-bookmark"></i>
                </Link>
              </div>
              <div className={classes.userimg}>
                <Image
                  cloudName="dntn0wocu"
                  publicId={imageId}
                  width="200"
                  height="200"
                  crop="scale"
                />
                <i onClick={showModalForm} className="fa-solid fa-camera"></i>
                <h3>Bio</h3>
                <p>{user.bio ? user.bio : "Tell others about yourself!"}</p>
              </div>
            </div>
            <div className={classes.userimg_mobile}>
              <Image
                cloudName="dntn0wocu"
                publicId={imageId}
                width="200"
                height="200"
                crop="scale"
              />
              <i onClick={showModalForm} className="fa-solid fa-camera"></i>
            </div>
            <div className={classes.userinfo_mobile}>
              <div className={classes.nameaddress}>
                <h1>{user.name}</h1>
                {user.address && <h4>{user.address}</h4>}
                <p>{user.email}</p>
                {user.number && <p>{user.number}</p>}
                <div className={classes.socials}>
                  {user.linkedIn && (
                    <a rel="noreferrer" target="_blank" href={user.linkedIn}>
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  )}
                  {user.github && (
                    <a rel="noreferrer" target="_blank" href={user.github}>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  )}
                </div>
              </div>
              <div className={classes.actions}>
                <Link to="/friendlist">
                  <i className="fa-solid fa-user-group"></i>
                </Link>
                <button onClick={editFormHandler}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <Link to="/bookmarked">
                  <i className="fa-solid fa-bookmark"></i>
                </Link>
              </div>
            </div>
            <div className={classes.mobile_bio}>
              <h4>Bio</h4>
              <p>{user.bio ? user.bio : "Tell others about yourself!"}</p>
            </div>
            <div className={classes.userposts}>
              <h2>Your Posts</h2>
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <PostItem
                    userId={user._id}
                    isLiked={post.isLiked}
                    isSaved={post.isSaved}
                    authorId={post.authorId}
                    key={post.id}
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    createdAt={post.createdAt}
                    title={post.title}
                    imageId={post.imageId}
                    userimgId={imageId}
                    comments={post.comments}
                  />
                ))
              ) : (
                <Link to="/add-post" className={classes.noposts}>
                  Add a post!!
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserAccount;
