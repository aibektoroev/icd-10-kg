import React, { useContext } from "react";
import { useNavigate } from "react-router";
import "./styles/navtree.css";
import AppContext from "../context";

export default function NavTree(props) {
  const { isLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const handleTreeNodeClicked = (e, node) => {
    e.preventDefault();

    navigate(`/page/${node.id}`);
  };

  const generatedNodes = (nodes) => {
    const lastNode = nodes.at(-1);

    return nodes
      .slice(0, -1)
      .map((node) => (
        <a
          href={`/page/${node.id}`}
          key={node.id}
          onClick={(e) => handleTreeNodeClicked(e, node)}
        >
          {node.mkb_code + (node.sign ? node.sign : "")}
        </a>
      ))
      .concat(
        <span key={lastNode.id}>
          {lastNode.mkb_code + (lastNode.sign ? lastNode.sign : "")}
        </span>
      );
  };

  return (
    <div
      id="nav-tree"
      className="container nav-tree-container sticky-top rounded"
    >
      {props.nodes.length > 1 ? (
        <>
          <div className="d-inline-block nav-tree-nodes mb-1">
            {generatedNodes(props.nodes).reduce((prev, curr) => [
              prev,
              <span key={"delimiter_" + prev.key} className="mx-1">
                |
              </span>,
              curr,
            ])}
          </div>{" "}
          <br />
        </>
      ) : null}

      <div className="container-liquid d-flex align-items-start justify-content-between">
        <span className="nav-tree-nodes me-1">
          {props.parent.mkb_code !== "МКБ-10" ? (
            <span>{props.parent.mkb_code + ": "}</span>
          ) : null}
          <span>{props.parent.title}</span>
        </span>

        {isLoggedIn ? (
          <span
            className="btn-add-item cursor-pointer rounded"
            onClick={props.onAddItemClicked}
          >
            Добавить
          </span>
        ) : null}
      </div>
    </div>
  );
}
