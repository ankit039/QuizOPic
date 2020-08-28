import React from "react";

const ThemeContext = React.createContext({
    theme: "",
    settheme: () => {}
  });

export default ThemeContext