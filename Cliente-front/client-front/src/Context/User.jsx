import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

export const Userc = () => {
  const context = useContext(userContext);
  return context;
};
export const GlobalUser = (props) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      //console.log("si hay carga");
      const parsedata = JSON.parse(data);
      setToken(parsedata);
    }
  }, [token]);

  const contextValue = {
    user,
    setUser,
    token,
    setToken,
  };

  return (
    // <userContext.Provider value={[user, setUser]}>
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
