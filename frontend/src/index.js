import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";

const routing = (
  <Router>
    <React.StrictMode>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
{
  /*}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
*/
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
