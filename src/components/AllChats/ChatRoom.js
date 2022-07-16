import { Fragment, useState, useRef, useEffect, useContext } from "react";
import classes from "./ChatRoom.module.css";
import Message from "./Message";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";
import LikeLoader from "../UI/LikeLoader";

const socket = io("https://intelligent-fromage-47264.herokuapp.com/");
const ChatRoom = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const roomId = params.chatId;
  const userId = params.userId;
  const [msgs, setmsgs] = useState([]);
  const msgref = useRef();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  useEffect(() => {
    socket.emit("joinroom", roomId);
    socket.on("online", () => {
      setOnline(true);
    });
    socket.on("sendmsg", (msg) => {
      setOnline(true);
      setmsgs((prevState) => {
        return prevState.concat({ content: msg, to: false });
      });
    });
  }, [roomId]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://intelligent-fromage-47264.herokuapp.com/post/chat/" +
        roomId +
        "/" +
        userId,
      {
        headers: {
          Authorisation: "Bearer " + authCtx.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setmsgs(data.messages);
        setName(data.username);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          title: "Failed to load Chats",
          message: "Please try again later.",
        });
        setIsLoading(false);
        console.log(err);
      });
  }, [roomId, userId, authCtx.token]);

  const msgSubmitHandler = (event) => {
    event.preventDefault();
    const newmsg = msgref.current.value;
    if (newmsg.trim() === "") {
      return;
    }
    setCommentLoading(true);
    fetch("https://intelligent-fromage-47264.herokuapp.com/post/addmessage", {
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
        if (!res.ok) {
          const error = new Error("Failed");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        setCommentLoading(false);
        socket.emit("message", newmsg, roomId);
        setmsgs((prevState) => {
          return prevState.concat({ content: newmsg, to: true });
        });
        msgref.current.value = "";
        console.log(data);
      })
      .catch((err) => {
        setError({
          title: "Failed to load Chats",
          message: "Please try again later.",
        });
        setCommentLoading(false);
        console.log(err);
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
      {commentLoading && <LikeLoader />}
      {!error && !isLoading && (
        <Fragment>
          <div className={classes.wrapper}>
            <div className={classes.msgwrapper}>
              <h2>
                {name}
                {online ? <i class="fa-solid fa-circle"></i> : ""}
              </h2>
              {msgs.length > 0 ? (
                msgs.map((msg) => {
                  return (
                    <Message
                      message={msg.content}
                      to={msg.to}
                      key={Math.random()}
                    />
                  );
                })
              ) : (
                <div className={classes.nomsgs}>
                  <p>Wave to {name}👋</p>
                </div>
              )}
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
      <div ref={messagesEndRef}></div>
    </Fragment>
  );
};

export default ChatRoom;
