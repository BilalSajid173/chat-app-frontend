import classes from "./AllPosts.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostItem from "./PostItem";
import UserInfo from "./UserInfo";
import FriendSection from "./FriendSection";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import Paginator from "../Paginator/Paginator";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const AllPosts = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [friendlist, setFriendlist] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/post/allposts/?page=" + page, {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
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
          return {
            isLiked: likedposts.includes(post._id) ? true : false,
            isSaved: savedposts.includes(post._id) ? true : false,
            id: post._id,
            author: post.author.name,
            content: post.content.slice(0, 250) + "...",
            createdAt: new Date(post.createdAt).toDateString(),
            authorId: post.author._id,
            title: post.title,
          };
        });
        setTotalPosts(data.totalItems);
        setFriendlist(data.user.friends);
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
  };

  const nextHandler = () => {
    console.log(page);
    setPage((prev) => {
      return prev + 1;
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
      {!error && isLoading && <LoadingSpinner />}
      {!error && !isLoading && <UserInfo name={user.name} />}
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
              />
            ))}
          </Paginator>
        </div>
      )}
    </Fragment>
  );
};

export default AllPosts;
