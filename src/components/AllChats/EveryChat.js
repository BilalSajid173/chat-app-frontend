import { Fragment, useEffect, useContext, useState } from "react";
import classes from "./EveryChat.module.css";
import ChatItem from "./ChatItem";
import AuthContext from "../../store/auth-context";

const EveryChat = () => {
  const [chats, setChats] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
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
        setChats(data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default EveryChat;
