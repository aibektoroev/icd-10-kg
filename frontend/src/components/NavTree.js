import React from "react";

export default function NavTree(props) {
  const generatedNodes = (nodes) => {
    return nodes
      .slice(0, -1)
      .map((node) => (
        <a
          href="/#"
          key={node.id}
          onClick={(e) => props.onTreeNodeClicked(e, node.id)}
        >
          {node.mkb_code}
        </a>
      ))
      .concat(<span key={nodes.at(-1).id}>{nodes.at(-1).mkb_code}</span>);
  };

  return (
    <div
      className="justify-content-between ms-4"
      style={{ fontSize: "18.5px" }}
    >
      {generatedNodes(props.nodes).reduce((prev, curr) => [
        prev,
        <span key={"delimiter_" + prev.key} className="mx-1">
          |
        </span>,
        curr,
      ])}
    </div>
  );
}
