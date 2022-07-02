import classes from "./SinglePost.module.css";
import { Fragment, useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import image from "../../images/userimg.png";
import SingleComment from "./Comment";
import AuthContext from "../../store/auth-context";
import PostItem from "../AllPosts/PostItem";

const SinglePost = (props) => {
  const authCtx = useContext(AuthContext);
  const cmtRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/post/singlepost/" + postId, {
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
        const curPost = {
          author: data.post.author.name,
          content: data.post.content,
          createdAt: new Date(data.post.createdAt).toDateString(),
          id: data.post._id,
          author_id: data.post.author._id,
        };
        setPost(curPost);
        setUser(data.user);
        setComments(data.post.comments);
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const posts = data.posts.map((post) => {
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            id: post._id,
            author: post.author.name,
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author._id,
          };
        });
        setAllPosts(posts);
      })
      .catch((err) => console.log(err));
  }, [authCtx.token, postId]);

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const comment = cmtRef.current.value;
    if (comment.trim() === "") {
      return;
    }
    fetch("http://localhost:8080/post/addComment/" + postId, {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        comment: comment,
      }),
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
        setComments((prevState) => {
          return prevState.concat({
            name: data.name,
            comment: comment,
            _id: data._id,
          });
        });
        cmtRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.postContainer}>
          <div className={classes.singlepost}>
            <div className={classes.userinfo}>
              <div>
                <img src={image} alt="img"></img>
              </div>
              <div>
                <h3>{post.author}</h3>
                <span>{post.createdAt}</span>
              </div>
            </div>
            <p>{post.content}</p>
          </div>
        </div>
        <div className={classes.comments}>
          <h2>Comments</h2>
          <form onSubmit={commentSubmitHandler}>
            <input
              type="text"
              placeholder="Say Something!"
              ref={cmtRef}
              id="comment"
            />
            <button>Add</button>
          </form>
          {comments.map((comment) => {
            return (
              <SingleComment
                key={comment._id}
                author={comment.name}
                comment={comment.comment}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.morePosts}>
        <h2>More</h2>
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
    </Fragment>
  );
};

export default SinglePost;
