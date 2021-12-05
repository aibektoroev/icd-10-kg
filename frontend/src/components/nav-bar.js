import React, { useState, useContext, useEffect } from "react";
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

  const [mobileView, setMobileView] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    setMobileView(window.innerWidth < 767);

    const handleResize = () => {
      setMobileView(window.innerWidth < 767);

      //if (!mobileView && expanded) setExpanded(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onLoginClicked = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      // Exit
      setIsLoggedIn(false);

      navigate("/logout");
    } else {
      // Go to login page
      navigate("/login");
    }
  };

  const onAlphabetsClicked = (e) => {
    e.preventDefault();

    setExpanded(false);
    navigate("/alphabet");
  };

  const unexpandIfMobileView = () => {
    if (mobileView && expanded) setExpanded(false);
  };

  const handleSearchItemClicked = (e, mkb_code) => {
    e.preventDefault();

    navigate(`/code/${mkb_code}`);

    unexpandIfMobileView();
  };

  return (
    <OutsideClickHandler onOutsideClick={unexpandIfMobileView}>
      <Navbar expand="md" fixed="top" expanded={expanded} className="navbar">
        <Container className="container-contents">
          <Nav.Link href="/" className="navbar-brandname">
            МКБ-10 для Кыргызстана
          </Nav.Link>
          <Navbar.Toggle
            as="span"
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
                href="/alphabet"
                className="nav-item"
                onClick={onAlphabetsClicked}
              >
                Алфавитные указатели
              </Nav.Link>
              <div className="nav-item">
                <SearchBar
                  mobileView={mobileView}
                  searchItemClickedHandler={handleSearchItemClicked}
                />
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
