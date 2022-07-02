import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./UserAccount.module.css";
import userimg from "../../images/userimg.png";
import { Link } from "react-router-dom";
import PostItem from "../AllPosts/PostItem";
import AuthContext from "../../store/auth-context";

const UserAccount = () => {
  const authCtx = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/post/account/", {
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
        const posts = data.posts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            id: post._id,
            author: data.user.name,
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author,
          };
        });
        setAllPosts(posts);
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token]);
  return (
    <Fragment>
      <div className={classes.main_container}>
        <div className={classes.user_profile}>
          <div className={classes.userinfo}>
            <div className={classes.nameaddress}>
              <h1>{user.name}</h1>
              {user.address && <h4>{user.address}</h4>}
              <p>{user.email}</p>
              {user.number && <p>{user.number}</p>}
              <div className={classes.socials}>
                {user.linkedin && (
                  <a rel="noreferrer" target="_blank" href={user.linkedin}>
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
              <button>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <Link to="">
                <i className="fa-solid fa-bookmark"></i>
              </Link>
            </div>
            <div className={classes.userimg}>
              <img src={userimg} alt="img"></img>
              <h4>Bio</h4>
              <p>
                Nec ullamcorper sit amet risus nullam eget felis. Integer vitae
                justo eget magna fermentum iaculis eu non diam. Laoreet sit amet
                cursus sit amet. Blandit turpis cursus in hac habitasse.
              </p>
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
                {user.linkedin && (
                  <a rel="noreferrer" target="_blank" href={user.linkedin}>
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
              <button>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <Link to="">
                <i className="fa-solid fa-bookmark"></i>
              </Link>
            </div>
          </div>
          <div className={classes.mobile_bio}>
            <h4>Bio</h4>
            <p>
              Nec ullamcorper sit amet risus nullam eget felis. Integer vitae
              justo eget magna fermentum iaculis eu non diam. Laoreet sit amet
              cursus sit amet. Blandit turpis cursus in hac habitasse. Nec
              ullamcorper sit amet risus nullam eget felis. Integer vitae justo
              eget magna fermentum iaculis eu non diam. Laoreet sit amet cursus
              sit amet. Blandit turpis cursus in hac habitasse. Nec ullamcorper
              sit amet risus nullam eget felis. Integer vitae justo eget magna
              fermentum iaculis eu non diam. Laoreet sit amet cursus sit amet.
              Blandit turpis cursus in hac habitasse.
            </p>
          </div>
          <div className={classes.userposts}>
            <h2>Your Posts</h2>
            {allPosts.map((post) => (
              <PostItem
                userId={user._id}
                isLiked={post.isLiked}
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
    </Fragment>
  );
};

export default UserAccount;
