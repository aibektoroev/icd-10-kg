import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/mkb-item.css";
import AppContext from "../context";
import utils from "../utils";

export default function MKBItem(props) {
  const { isLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const titleClickedHandler = (e) => {
    e.preventDefault();

    navigate(`/page/${props.item.id}`);
  };

  const handleEditItem = (e) => {
    e.preventDefault();

    props.editItemHandler(props.item);
  };

  return (
    <div className="mkb-item-container">
      {/* -- mkb-code, title and edit button -- */}
      <div className="d-flex align-items-start justify-content-between ms-4 me-1 mt-1">
        <span id={"item-" + props.item.mkb_code} className="mkb-title">
          <span className="mkb-code-badge px-1 rounded cursor-pointer">
            <a
              href={`/page/${props.item.id}`}
              onClick={titleClickedHandler}
              className="text-light text-decoration-none"
            >
              {props.item.mkb_code + (props.item.sign ? props.item.sign : "")}
            </a>
          </span>
          <a
            href={`/page/${props.item.id}`}
            onClick={titleClickedHandler}
            className="ms-1"
          >
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
        <pre className="text-description">
          {props.item.subtitle
            ? utils.parseMKBCodesInText(props.item.subtitle)
            : "Примечания отсутствуют."}
        </pre>
      </div>
    </div>
  );
}
