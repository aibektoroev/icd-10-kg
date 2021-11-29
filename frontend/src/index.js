import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import Logout from "./components/logout";
import AlphabetCategories from "./components/alphabet-categories";
import AlphabetGroups from "./components/alphabet-groups";
import Alphabets from "./components/alphabets";
import AppContext from "./context";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

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
              exact
              path="/login"
              element={
                <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                  <Login />
                </AppContext.Provider>
              }
            />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/alphabet" element={<AlphabetCategories />} />
            <Route
              exact
              path="/alphabet/:cat_id"
              element={<AlphabetGroups />}
            />
            <Route
              exact
              path="/alphabet/:cat_id/:group_id"
              element={<Alphabets />}
            />
          </Routes>
        </React.StrictMode>
      </Router>
    </React.Fragment>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
