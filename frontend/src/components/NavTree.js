import React from "react";
import "./navtree.css";

export default function NavTree(props) {
  const generatedNodes = (nodes) => {
    return nodes
      .slice(0, -1)
      .map((node) => (
        <a
          href="/#"
          key={node.id}
          onClick={(e) => props.onTreeNodeClicked(e, node)}
        >
          {node.mkb_code}
        </a>
      ))
      .concat(<span key={nodes.at(-1).id}>{nodes.at(-1).mkb_code}</span>);
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
          <span>{props.parent.mkb_code + ": "}</span>
          <span>{props.parent.title}</span>
        </span>

        {props.isEditMode ? (
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
