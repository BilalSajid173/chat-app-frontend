import { Fragment, useState, useRef, useEffect, useContext } from "react";
import classes from "./ChatRoom.module.css";
import Message from "./Message";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const socket = io("http://localhost:8080/");
const ChatRoom = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const roomId = params.chatId;
  const userId = params.userId;
  const [msgs, setmsgs] = useState([]);
  const msgref = useRef();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.emit("joinroom", roomId);
    socket.on("sendmsg", (msg) => {
      setmsgs((prevState) => {
        return prevState.concat({ content: msg, to: false });
      });
    });
  }, [roomId]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/post/chat/" + roomId + "/" + userId, {
      headers: {
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setmsgs(data.messages);
        setName(data.username);
        setIsLoading(false);
      });
  }, [roomId, userId, authCtx.token]);

  const msgSubmitHandler = (event) => {
    event.preventDefault();
    const newmsg = msgref.current.value;
    if (newmsg.trim() === "") {
      return;
    }

    fetch("http://localhost:8080/post/addmessage", {
      body: JSON.stringify({
        roomId,
        userId,
        content: newmsg,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorisation: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));

    socket.emit("message", newmsg, roomId);
    setmsgs((prevState) => {
      return prevState.concat({ content: newmsg, to: true });
    });
    msgref.current.value = "";
  };
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Fragment>
          <div className={classes.wrapper}>
            <div className={classes.msgwrapper}>
              <h2>{name}</h2>
              {msgs.map((msg) => {
                return (
                  <Message
                    message={msg.content}
                    to={msg.to}
                    key={Math.random()}
                  />
                );
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
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ChatRoom;
