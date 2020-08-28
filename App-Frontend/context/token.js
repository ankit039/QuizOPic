import React from "react";

const TokenContext = React.createContext({
    token: "",
    settoken: () => {}
  });

export default TokenContext