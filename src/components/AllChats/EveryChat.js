import { Fragment, useEffect, useContext, useState } from "react";
import classes from "./EveryChat.module.css";
import ChatItem from "./ChatItem";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const EveryChat = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
        console.log(err);
      });
  }, [authCtx.token]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes.maincontainer}>
          <div className={classes.heading}>
            <h2>Your Conversations</h2>
          </div>
          <div className={classes.chatscontainer}>
            {chats.map((chat) => (
              <ChatItem
                name={chat.with.name}
                roomId={chat.roomId}
                key={chat.roomId}
                userId={chat.with.userId}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EveryChat;
