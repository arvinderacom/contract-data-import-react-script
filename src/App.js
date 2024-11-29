// src/App.js
import React from "react";
import { Web3Provider } from "./contexts/Web3Context";
import Admin from "./components/Admin";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f2f5;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#4caf50",
    secondary: "#45a049",
    background: "#ffffff",
    text: "#333",
  },
  breakpoints: {
    mobile: "600px",
    tablet: "900px",
  },
};

const App = () => {
  return (
    <Web3Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Admin />
      </ThemeProvider>
    </Web3Provider>
  );
};

export default App;
