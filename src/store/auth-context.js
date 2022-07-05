import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  name: "",
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const remainingDuraton = (expirationTime) => {
  const currentTime = new Date().getTime();
  const exptimeinms = new Date(expirationTime).getTime();

  const remTime = exptimeinms - currentTime;

  return remTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpTime = localStorage.getItem("expirationTime");
  const storedName = localStorage.getItem("name");

  const remTime = remainingDuraton(storedExpTime);
  if (remTime < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    storedToken,
    remTime,
    storedName,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initalToken;
  let username;
  if (tokenData) {
    initalToken = tokenData.storedToken;
    username = tokenData.storedName;
  }
  const [token, setToken] = useState(initalToken);
  const [name, setName] = useState(username);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (username, token, expirationTime) => {
    setName(username);
    setToken(token);
    localStorage.setItem("name", username);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = remainingDuraton(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remTime);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    name: name,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
