import React, { useState } from "react";
import EmbeddedLink from "./EmbeddedLink";
import "./mkb_item.css";

export default function MKBItem(props) {
  const [isEditMode, setEditMode] = useState(false);

  const parseLinksInText = (text) => {
    if (text.length < 4) return text;

    text = text + " ";
    const pattern =
      /\b[A-Z]{1}\d{2}-[A-Z]{1}\d{2}\b|\b[A-Z]{1}\d{2}\.\d{1}[+*]?\b|\b[A-Z]{1}\d{2}[+*]?\b/g;

    const links = Array.from(text.matchAll(pattern));

    let [left, right] = ["", text];
    const elements = [];

    links.forEach((link, index) => {
      link = link[0];

      const exp = new RegExp(link + "(.+)");

      [left, ...right] = right.split(exp);
      right = right.join("");

      elements.push(<span key={"" + index + 1}>{left}</span>);
      elements.push(
        <EmbeddedLink
          key={"" + index + 2}
          code={link}
          onEmbeddedLinkClicked={props.onEmbeddedLinkClicked}
        />
      );
    });

    elements.push(<span key={"last_elem"}>{right}</span>);

    return elements;
  };

  const titleClickedHandler = (e) => {
    e.preventDefault();

    props.onTitleClicked(props.item);
  };

  const handleEditItem = (e) => {
    e.preventDefault();

    props.editItemHandler(props.item);
  };

  return (
    <>
      <div className="ms-4 mt-1 me-auto">
        <span id={"item-title-" + props.item.mkb_code} className="mkb-title">
          <span
            className="mkb-code-badge px-2 rounded cursor-pointer"
            onClick={titleClickedHandler}
          >
            {props.item.mkb_code}
          </span>
          <a href="/#" onClick={titleClickedHandler} className="ms-2">
            {props.item.title}
          </a>
        </span>

        <br />
        <pre className="mkb-subtitle">
          {props.item.subtitle
            ? parseLinksInText(props.item.subtitle)
            : "Примечания отсутствуют."}
        </pre>
      </div>

      {isEditMode ? (
        <span
          className="badge badge-edit text-dark cursor-pointer mx-2 mt-2"
          onClick={handleEditItem}
        >
          Изменить
        </span>
      ) : null}
    </>
  );
}
