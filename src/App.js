import "./App.css";
import React, { useContext } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import FetchAllPosts from "./pages/AllPosts";
import AuthContext from "./store/auth-context";
import AddNewPost from "./pages/AddPost";
import FriendList from "./pages/FriendList";
import ViewPost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import UserProfile from "./pages/ViewProfile";
import AllChats from "./pages/AllChats";
import PrivateChat from "./pages/PrivateChat";
import PageNotFound from "./pages/PageNotFound";
import Bookmarked from "./pages/Bookmarked";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      {!authCtx.isLoggedIn && <Route path="/" element={<Login />} />}
      {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
      {authCtx.isLoggedIn && (
        <Route path="/allposts" element={<FetchAllPosts />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/add-post" element={<AddNewPost />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/friendlist" element={<FriendList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/singlepost/:postId" element={<ViewPost />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/user_account" element={<Profile />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/user/:userId" element={<UserProfile />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/chat/:chatId/:userId" element={<PrivateChat />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/bookmarked" element={<Bookmarked />} />
      )}
      {authCtx.isLoggedIn && <Route path="/allchats" element={<AllChats />} />}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
// sdnsldslcd
// aodofdfdlkv
/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
