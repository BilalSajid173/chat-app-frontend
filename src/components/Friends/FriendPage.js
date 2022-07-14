import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./FriendPage.module.css";
import SingleFriend from "../AllPosts/SingleFriend";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/ErrorModal";
import PostItem from "../AllPosts/PostItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const FriendPage = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [friends, setFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://intelligent-fromage-47264.herokuapp.com/post/friendlist/", {
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
        const yourfriends = data.user.friends.map((friend) => {
          const roomId =
            friend.chats.filter((chat) => chat.with.userId === data.user._id)
              .length > 0
              ? friend.chats.filter(
                  (chat) => chat.with.userId === data.user._id
                )[0].roomId
              : "_" + Math.random().toString(36).substr(2, 11);
          return {
            name: friend.name,
            address: friend.address,
            _id: friend._id,
            imageId: friend.imageId,
            roomId: roomId,
          };
        });
        setAllFriends(yourfriends);
        setFriends(yourfriends);
        const likedposts = data.user.likedPosts ? data.user.likedPosts : [];
        const savedposts = data.user.savedPosts ? data.user.savedPosts : [];
        let allPosts = [];
        data.user.friends.forEach((friend) => {
          friend.posts.forEach((post) => {
            allPosts.push(post);
          });
        });
        allPosts.sort((a, b) => 0.5 - Math.random());
        setPosts(
          allPosts.map((post) => {
            return {
              isLiked: likedposts.includes(post._id) ? true : false,
              isSaved: savedposts.includes(post._id) ? true : false,
              id: post._id,
              author: post.author.name,
              content: post.content.slice(0, 150) + "...",
              createdAt: new Date(post.createdAt).toDateString(),
              authorId: post.author._id,
              title: post.title,
              imageId: post.publicId,
              userimgId: post.author.imageId,
              comments: post.comments.length,
            };
          })
        );
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
  }, [authCtx.token]);

  const searchHandler = (event) => {
    const regexp = new RegExp(event.target.value, "i");
    setFriends(allFriends.filter((friend) => friend.name.match(regexp)));
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && !isLoading && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <Fragment>
          <div className={classes.mobile}>
            <div className={classes.listcontainer}>
              <input
                onChange={searchHandler}
                placeholder="Search"
                type="text"
              />
              <h2>Your Friends</h2>
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <div className={classes.friendcont}>
                    <SingleFriend
                      key={friend._id}
                      name={friend.name}
                      id={friend._id}
                      userimgId={friend.imageId}
                      address={friend.address}
                    />
                    <div className={classes.msgchat}>
                      <Link to={`/chat/${friend.roomId}/${friend._id}`}>
                        <i className="fa-solid fa-message"></i>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className={classes.nofriends}>No Friends Found :(</p>
              )}
            </div>
          </div>
          <div className={classes.container}>
            <h2>Recent Posts</h2>
            {posts.length > 0 ? (
              posts.map((post) => (
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
                  userimgId={post.userimgId}
                  comments={post.comments}
                />
              ))
            ) : (
              <p className={classes.nopost}>No Recent Posts</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FriendPage;
