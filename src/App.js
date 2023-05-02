import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { SnackbarProvider } from "notistack";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home"
import AuthContext from "./Store/AuthManager";

let theme = createTheme({});
theme = responsiveFontSizes(theme);

function App() {
  const authCtx = useContext(AuthContext);

  return (

    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
        domRoot={document.getElementById("notification")}
      >
        <Routes>
          <Route
            path="/"
            element={
              !authCtx.isLoggedIn ? <Login /> : <Home />}
          />
          <Route

            path="/Home"
            element={
              authCtx.isLoggedIn ? <Home /> : <Navigate to="/" />
            }
          />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;