import React from "react";
import "./searchitem.css";

export default function SearchItem(props) {
  return (
    <div
      className="searchItem"
      onClick={(e) => props.searchItemClickedHandler(e, props.mkb_code)}
    >
      <span className="mkbCode">{props.mkb_code}</span>
      <span className="mkbTitle">{props.title}</span>
    </div>
  );
}
