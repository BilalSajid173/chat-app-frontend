import { Fragment, useState, useRef, useEffect } from "react";
import classes from "./ChatRoom.module.css";
import Message from "./Message";
import { io } from "socket.io-client";
import { useParams } from "react-router";

const dummyMessages = [
  { message: "Hello :)" },
  { message: "Hiii :)" },
  { message: "How are you?" },
  { message: "I am fine thnx, wbu?" },
  {
    message:
      "I am also fine thank you! I am also fine thank you! I am also fine thank you! I am also fine thank you! I am also fine thank you! I am also fine thank you!",
  },
];

const socket = io("http://localhost:8080/");
const ChatRoom = () => {
  const params = useParams();
  const roomId = params.chatId;
  const [msgs, setmsgs] = useState(dummyMessages);
  const msgref = useRef();

  useEffect(() => {
    socket.emit("joinroom", roomId);
    socket.on("sendmsg", (msg) => {
      setmsgs((prevState) => {
        return prevState.concat({ message: msg });
      });
    });
  }, [roomId]);

  const msgSubmitHandler = (event) => {
    event.preventDefault();
    const newmsg = msgref.current.value;
    if (newmsg.trim() === "") {
      return;
    }

    socket.emit("message", newmsg, roomId);
    // socket.on("hello", (msg) => {
    //   console.log("in");
    //   setmsgs((prevState) => {
    //     return prevState.concat({ message: msg });
    //   });
    // });
    setmsgs((prevState) => {
      return prevState.concat({ message: newmsg });
    });
    msgref.current.value = "";
  };
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.msgwrapper}>
          <h2>Nasrul</h2>
          {msgs.map((msg) => {
            return <Message message={msg.message} />;
          })}
        </div>
      </div>
      <div className={classes.msgform}>
        <form onSubmit={msgSubmitHandler}>
          <input
            placeholder="Type something"
            type="text"
            id="msg"
            autoComplete="off"
            required
            ref={msgref}
          />
          <button>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
