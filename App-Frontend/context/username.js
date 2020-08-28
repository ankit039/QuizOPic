import React from "react";

const UsernameContext = React.createContext({
    username: "",
    setusername: () => {}
  });

export default UsernameContext