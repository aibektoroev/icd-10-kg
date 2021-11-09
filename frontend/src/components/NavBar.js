import React from "react";
import SearchBar from "./SearchBar";
import "./navbar.css";

export default function NavBar(props) {
  const onLoginClicked = (event) => {
    event.preventDefault();

    // TO DO : implement login fuctionality

    console.log("LOGIN Clicked!!!");
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
              Войти
            </a>
          </small>
        </span>
      </div>
    </nav>
  );
}
