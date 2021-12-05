import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmbeddedLink({ mkb_code }) {
  const navigate = useNavigate();

  const url = `/code/${mkb_code}`;

  const onEmbeddedLinkClicked = (e) => {
    e.preventDefault();

    navigate(url);
  };
  return (
    <a href={url} onClick={(e) => onEmbeddedLinkClicked(e)}>
      {mkb_code}
    </a>
  );
}
