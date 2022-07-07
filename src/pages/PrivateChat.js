import ChatRoom from "../components/AllChats/ChatRoom";
import Navbar from "../components/Navbar/navbar";
import { Fragment } from "react";

const PrivateChat = () => {
  return (
    <Fragment>
      <Navbar />
      <ChatRoom />
    </Fragment>
  );
};

export default PrivateChat;
