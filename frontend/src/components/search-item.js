import React from "react";
import "./styles/search-item.css";

export default function SearchItem(props) {
  return (
    <a
      className="searchItem"
      href={`/code/${props.mkb_code}`}
      onClick={(e) => props.searchItemClickedHandler(e, props.mkb_code)}
    >
      <span className="mkbCode">
        {props.mkb_code + (props.sign ? props.sign : "")}
      </span>
      <span className="mkbTitle">{props.title}</span>
    </a>
  );
}
