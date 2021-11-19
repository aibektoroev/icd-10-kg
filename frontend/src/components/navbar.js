import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search-bar";
import AppContext from "../context";
import "./styles/navbar.css";

export default function NavBar(props) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const onLoginClicked = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      // Exit
      setIsLoggedIn(false);

      navigate("/logout");
    } else {
      // Go to login page
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
      <div className="container justify-content-end container-contents align-items-center">
        <a className="navbar-brand ms-3 me-auto" href="/#">
          Справочник МКБ-10 для Кыргызстана
        </a>
        <span className="d-flex justify-content-end align-items-center">
          <SearchBar
            searchItemClickedHandler={props.searchItemClickedHandler}
          />
          <small>
            <a href="/#" onClick={onLoginClicked} className="text-light mx-2">
              {isLoggedIn ? "Выйти" : "Войти"}
            </a>
          </small>
        </span>
      </div>
    </nav>
  );
}
