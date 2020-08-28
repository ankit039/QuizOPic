import React from "react";

const CurscoreContext = React.createContext({
    curscore: "00",
    setcurscore: () => {}
  });

export default CurscoreContext