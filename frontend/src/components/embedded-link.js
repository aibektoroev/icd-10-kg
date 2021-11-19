import React from "react";

export default function EmbeddedLink(props) {
  return (
    <a href="/#" onClick={(e) => props.onEmbeddedLinkClicked(e, props.code)}>
      {props.code}
    </a>
  );
}
