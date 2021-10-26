import React from "react";
import SearchBar from "./SearchBar";

export default function NavBar(props) {
  const navBarStyles = {
    top: "0",
    maxWidth: "1080px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#0269A4",
    overflow: "hidden",
  };

  const onLoginClicked = (event) => {
    event.preventDefault();

    // implement login fuctionality

    console.log("LOGIN Clicked!!!");
  };

  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg fixed-top justify-content-between mb-2"
      style={navBarStyles}
    >
      <a className="navbar-brand ms-3 me-auto" href="/#">
        Справочник МКБ-10 для Кыргызстана
      </a>
      <SearchBar searchItemClickedHandler={props.searchItemClickedHandler} />
      <a href="/#" onClick={onLoginClicked} className="text-light me-4 px-3">
        Войти
      </a>
    </nav>
  );
}
