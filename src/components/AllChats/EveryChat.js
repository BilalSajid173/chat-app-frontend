import { Fragment } from "react";
import classes from "./EveryChat.module.css";
import ChatItem from "./ChatItem";

const dummyChats = [
  { name: "Bilal Sajid", id: "1" },
  { name: "Bilal Sajid", id: "2" },
  { name: "Bilal Sajid", id: "3" },
];

const EveryChat = () => {
  return (
    <Fragment>
      <div className={classes.maincontainer}>
        <div className={classes.heading}>
          <h2>Your Conversations</h2>
        </div>
        <div className={classes.chatscontainer}>
          {dummyChats.map((chat) => (
            <ChatItem name={chat.name} id={chat.id} key={chat.key} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default EveryChat;
