import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import SearchItem from "./search-item";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { search } from "../api";
import "./styles/search-bar.css";
import { height } from "@mui/system";

function SearchBar(props) {
  const [inputGotFocus, setInputGotFocus] = useState(false);

  const [inputText, setInputText] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const setStyles = () => {
    let heightVal = "40px";

    if (searchResults.length > 0) {
      heightVal = props.mobileView ? "180px" : "280px";
    }
    document.getElementById("list-results").style.height = heightVal;
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(inputText), 150);
    return () => clearTimeout(timeOutId);
  }, [inputText]);

  useEffect(() => {
    setStyles();
  }, [searchResults, props.mobileView]);

  useEffect(() => {
    if (inputGotFocus) {
      //setStyles();

      document.getElementById("list-results").style.display = "block";
    } else {
      document.getElementById("list-results").style.display = "none";
    }
  }, [inputGotFocus]);

  // Search functionality
  async function handleSearch(keyword) {
    if (keyword.length < 3) {
      setSearchResults([]);

      return;
    }

    search(keyword)
      .then((res) => {
        if (res.data) {
          setSearchResults(res.data);
          //showSearchResults();
        } //else setSearchResults([]);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);

          console.log("Search results is : " + searchResults);
        }
      });
  }

  const handleSearchItemClick = (e, mkb_code) => {
    props.searchItemClickedHandler(e, mkb_code);

    setInputGotFocus(false);
  };

  function handleInput(e) {
    e.preventDefault();

    setInputText(e.target.value);
  }

  function clearInput(e) {
    e.preventDefault();

    setInputText("");

    document.getElementById("search-input").focus();
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setInputGotFocus(false);
      }}
    >
      <div className="search-bar">
        <div className="search-field">
          <input
            id="search-input"
            type="text"
            value={inputText}
            placeholder="Код или наименование"
            onChange={handleInput}
            onFocus={() => {
              setInputGotFocus(true);
            }}
          />
          <div className="search-icon">
            {inputText.length > 0 && inputGotFocus ? (
              <CloseIcon
                className="close-icon"
                color="#2BA3D4"
                onClick={clearInput}
              />
            ) : (
              <SearchIcon color="#2BA3D4" />
            )}
          </div>
        </div>

        <div id="list-results" className="list-results">
          {searchResults.map((record) => (
            <SearchItem
              key={record.id}
              searchItemClickedHandler={handleSearchItemClick}
              mkb_code={record.mkb_code}
              sign={record.sign}
              title={record.title}
            />
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default SearchBar;
