import classes from "./AllPosts.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostItem from "./PostItem";
import UserInfo from "./UserInfo";
import FriendSection from "./FriendSection";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import Paginator from "../Paginator/Paginator";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [friendlist, setFriendlist] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://intelligent-fromage-47264.herokuapp.com/post/allposts/?page=" +
        page,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Getting Posts Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const likedposts = data.likedPosts ? data.likedPosts : [];
        const savedposts = data.savedPosts ? data.savedPosts : [];
        const posts = data.posts.map((post) => {
          console.log(post.createdAt);
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            isSaved: savedposts.includes(post._id) ? true : false,
            id: post._id,
            author: post.author.name,
            content: post.content.slice(0, 150) + "...",
            createdAt: post.createdAt,
            authorId: post.author._id,
            title: post.title,
            imageId: post.publicId,
            userimgId: post.author.imageId,
            comments: post.comments.length,
          };
        });
        setTotalPosts(data.totalItems);
        setFriendlist(data.randompeople);
        setAllPosts(posts);
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Failed to load posts",
          message: "Please try again later.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token, page]);

  const prevHandler = () => {
    setPage((prev) => {
      return prev - 1;
    });
    navigate(`/allposts?page=${page - 1}`);
  };

  const nextHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
    navigate(`/allposts?page=${page + 1}`);
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
      {!error && isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <UserInfo name={user.name} userimgId={user.imageId} />
      )}
      {!error && !isLoading && <FriendSection friends={friendlist} />}
      {!error && !isLoading && (
        <div className={classes.container}>
          <div className={classes.username_mobile}>
            <h2>Welcome {user.name}👋👋</h2>
          </div>
          <Paginator
            onPrevious={prevHandler}
            onNext={nextHandler}
            currentPage={page}
            lastPage={Math.ceil(totalPosts / 5)}
          >
            {allPosts.map((post) => (
              <PostItem
                title={post.title}
                userId={user._id}
                isLiked={post.isLiked}
                isSaved={post.isSaved}
                authorId={post.authorId}
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                createdAt={post.createdAt}
                imageId={post.imageId}
                userimgId={post.userimgId}
                comments={post.comments}
              />
            ))}
          </Paginator>
        </div>
      )}
    </Fragment>
  );
};

export default AllPosts;
