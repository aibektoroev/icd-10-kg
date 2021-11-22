import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./search-bar";
import AppContext from "../context";
import "./styles/nav-bar.css";

export default function NavBar(props) {
  const [expanded, setExpanded] = useState(false);

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

  const handleSearchItemClicked = (e, mkb_code) => {
    props.searchItemClickedHandler(e, mkb_code);

    setExpanded(false);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setExpanded(false);
      }}
    >
      <Navbar
        expand="md"
        fixed="top"
        collapseOnSelect
        expanded={expanded}
        className="navbar"
      >
        <Container className="container-contents">
          <Nav.Link href="/" className="navbar-brandname">
            МКБ-10 для Кыргызстана
          </Nav.Link>
          <Navbar.Toggle
            as="icon"
            aria-controls="nav-items"
            data-bs-target="#nav-items"
            icon="bars-icon"
            onClick={() => setExpanded(!expanded)}
          >
            <FontAwesomeIcon id="bars-icon" icon={faBars} color="#ffffff" />
          </Navbar.Toggle>
          <Navbar.Collapse id="nav-items">
            <Nav className="container-fluid justify-content-end align-items-md-center">
              <Nav.Link
                href="/#"
                className="nav-item"
                onClick={() => setExpanded(false)}
              >
                Алфавитные указатели
              </Nav.Link>
              <div className="nav-item">
                <SearchBar searchItemClickedHandler={handleSearchItemClicked} />
              </div>
              <Nav.Link href="/#" onClick={onLoginClicked} className="nav-item">
                {isLoggedIn ? "Выйти" : "Войти"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </OutsideClickHandler>
  );
}
