import React, { useContext } from "react";
import EmbeddedLink from "./embedded-link";
import "./styles/mkb-item.css";
import AppContext from "../context";

export default function MKBItem(props) {
  const { isLoggedIn } = useContext(AppContext);

  const parseLinksInText = (text) => {
    if (text.length < 4) return text;

    text = text + " ";
    const pattern =
      /\b[A-Z]{1}\d{2}-[A-Z]{1}\d{2}\b|\b[A-Z]{1}\d{2}\.\d{1}[+*]?\b|\b[A-Z]{1}\d{2}[+*]?\b/g;

    const links = Array.from(text.matchAll(pattern));

    if (props.item.mkb_code === "A18.0+") console.log("FOUND LINKS : " + links);

    let [left, right] = ["", text];
    const elements = [];

    links.forEach((link, index) => {
      link = link[0];

      /* Did not work properly
      const exp = new RegExp(`/${link}(.+)/`);

      [left, ...right] = right.split(exp);
      */

      const split_pos = right.indexOf(link);

      left = right.substring(0, split_pos);
      right = right.substring(split_pos + link.length);

      //right = right.join("");

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
    <div className="mkb-item-container">
      {/* -- title and edit button -- */}
      <div className="d-flex align-items-start justify-content-between ms-4 me-1 mt-1">
        <span id={"item-" + props.item.mkb_code} className="mkb-title">
          <span
            className="mkb-code-badge px-1 rounded cursor-pointer"
            onClick={titleClickedHandler}
          >
            {props.item.mkb_code}
          </span>
          <a href="/#" onClick={titleClickedHandler} className="ms-1">
            {props.item.title}
          </a>
        </span>

        {isLoggedIn ? (
          <span
            className="btn-edit-item cursor-pointer rounded"
            onClick={handleEditItem}
          >
            Изменить
          </span>
        ) : null}
      </div>

      {/* -- subtitle -- */}
      <div className="d-flex justify-content-start ms-4 me-1 mt-1">
        <pre className="mkb-subtitle">
          {props.item.subtitle
            ? parseLinksInText(props.item.subtitle)
            : "Примечания отсутствуют."}
        </pre>
      </div>
    </div>
  );
}
