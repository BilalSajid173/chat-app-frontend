import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./UserAccount.module.css";
import userimg from "../../images/userimg.png";
import { Link, useParams } from "react-router-dom";
import PostItem from "../AllPosts/PostItem";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const UserAccount = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const params = useParams();
  const userId = params.userId;
  const [error, setError] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/post/user/" + userId, {
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
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author,
          };
        });
        setIsFriend(data.isFriend);
        setLoggedInUserId(loggedInUserId);
        setAllPosts(posts);
        setUser(data.user);
        setRoomId(data.roomId);
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
  }, [authCtx.token, userId, loggedInUserId]);

  const friendHandler = () => {
    fetch("http://localhost:8080/post/add-friend/" + isFriend + "/" + userId, {
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
        setIsFriend((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
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
                <button onClick={friendHandler}>
                  {!isFriend && <i className="fa-solid fa-square-plus"></i>}
                  {isFriend && <i className="fa-solid fa-trash"></i>}
                </button>
                <Link to={`/chat/${roomId}/${userId}`}>
                  <i className="fa-solid fa-message"></i>
                </Link>
              </div>
              <div className={classes.userimg}>
                <img src={userimg} alt="img"></img>
                <h4>Bio</h4>
                <p>{user.bio}</p>
              </div>
            </div>
            <div className={classes.userimg_mobile}>
              <img src={userimg} alt="img"></img>
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
                <button onClick={friendHandler}>
                  {!isFriend && <i className="fa-solid fa-square-plus"></i>}
                  {isFriend && <i className="fa-solid fa-trash"></i>}
                </button>
                <Link to={`/chat/${roomId}/${userId}`}>
                  <i className="fa-solid fa-message"></i>
                </Link>
              </div>
            </div>
            <div className={classes.mobile_bio}>
              <h4>Bio</h4>
              <p>{user.bio}</p>
            </div>
            <div className={classes.userposts}>
              <h2>Your Posts</h2>
              {allPosts.map((post) => (
                <PostItem
                  userId={loggedInUserId}
                  isLiked={post.isLiked}
                  isSaved={post.isSaved}
                  authorId={post.authorId}
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  createdAt={post.createdAt}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserAccount;
