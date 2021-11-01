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
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top justify-content-between mb-2">
      <a className="navbar-brand ms-3 me-auto" href="/#">
        Справочник МКБ-10 для Кыргызстана
      </a>
      <SearchBar searchItemClickedHandler={props.searchItemClickedHandler} />
      <small>
        <a href="/#" onClick={onLoginClicked} className="text-light mx-3">
          Войти
        </a>
      </small>
    </nav>
  );
}
