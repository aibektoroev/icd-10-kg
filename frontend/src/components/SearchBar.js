import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import SearchItem from "./SearchItem";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { search } from "../api";
import "./searchbar.css";

function SearchBar(props) {
  const [inputGotFocus, setInputGotFocus] = useState(false);

  const [inputText, setInputText] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(inputText), 150);
    return () => clearTimeout(timeOutId);
  }, [inputText]);

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
          showSearchResults();
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

    hideSearchResults();
  };

  function handleInput(e) {
    e.preventDefault();

    setInputText(e.target.value);
  }

  function clearInput(e) {
    e.preventDefault();

    setInputText("");

    document.getElementById("searchInput").focus();
  }

  function showSearchResults() {
    setInputGotFocus(true);

    document.getElementById("listSearchResults").style.display = "block";
  }

  const hideSearchResults = () => {
    setInputGotFocus(false);

    document.getElementById("listSearchResults").style.display = "none";
  };

  return (
    <OutsideClickHandler onOutsideClick={hideSearchResults}>
      <div className="searchBar">
        <div className="searchField">
          <input
            id="searchInput"
            type="text"
            value={inputText}
            placeholder="Код или наименование"
            onChange={handleInput}
            onFocus={showSearchResults}
          />
          <div className="searchIcon">
            {inputText.length > 0 && inputGotFocus ? (
              <CloseIcon
                className="closeIcon"
                color="primary"
                onClick={clearInput}
              />
            ) : (
              <SearchIcon color="primary" />
            )}
          </div>
        </div>

        <div id="listSearchResults" className="listResults">
          {searchResults.map((record) => (
            <SearchItem
              key={record.id}
              searchItemClickedHandler={handleSearchItemClick}
              mkb_code={record.mkb_code}
              title={record.title}
            />
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default SearchBar;
