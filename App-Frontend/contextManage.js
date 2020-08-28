import React from "react";

const LoginContext = React.createContext({
    isLogin: 0,
    setisLogin: () => {}
  });

export default LoginContext