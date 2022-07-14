import { Fragment, useEffect, useContext, useState } from "react";
import classes from "./EveryChat.module.css";
import ChatItem from "./ChatItem";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";

const EveryChat = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/post/allchats", {
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
        setIsLoading(false);
        setChats(data.userData);
      })
      .catch((err) => {
        setError({
          title: "Failed to load Chats",
          message: "Please try again later.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token]);

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
      {!isLoading && !error && (
        <div className={classes.maincontainer}>
          <div className={classes.heading}>
            <h2>Your Conversations</h2>
          </div>
          <div className={classes.chatscontainer}>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <ChatItem
                  name={chat.withUser.name}
                  roomId={chat.roomId}
                  key={chat.roomId}
                  userId={chat.withUser.userId}
                  imageId={chat.imageId}
                  address={chat.address}
                />
              ))
            ) : (
              <p className={classes.nochats}>You have no conversations</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EveryChat;
