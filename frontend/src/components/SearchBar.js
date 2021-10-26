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
    const timeOutId = setTimeout(() => handleSearch(inputText), 300);
    return () => clearTimeout(timeOutId);
  }, [inputText]);

  useEffect(() => {
    showSearchResults();
    // eslint-disable-next-line
  }, [searchResults]);

  // Search functionality
  async function handleSearch(keyword) {
    if (keyword.length < 3) {
      setSearchResults([]);

      return;
    }

    search(keyword)
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
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
  }

  function showSearchResults() {
    setInputGotFocus(true);

    let displayProp = searchResults.length > 0 ? "block" : "none";

    document.getElementById("listSearchResults").style.display = displayProp;
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
