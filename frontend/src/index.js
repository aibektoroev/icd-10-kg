import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import Login from "./components/login";
import Logout from "./components/logout";
import AppContext from "./context";
import reportWebVitals from "./reportWebVitals";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.Fragment>
      <Router>
        <React.StrictMode>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                  <App />
                </AppContext.Provider>
              }
            />
            <Route
              path="/login"
              element={
                <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                  <Login />
                </AppContext.Provider>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </React.StrictMode>
      </Router>
    </React.Fragment>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
