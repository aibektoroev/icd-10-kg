import React from "react";

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

  const navTreeStyles = {
    top: "56px",
    padding: "12px 5px 0px 0px",
    maxWidth: "1080px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(255, 255, 255, 1)",
  };

  return (
    <div className="container sticky-top" style={navTreeStyles}>
      <div className="d-flex ms-3" style={{ fontSize: "17px" }}>
        {props.nodes.length > 1
          ? generatedNodes(props.nodes).reduce((prev, curr) => [
              prev,
              <span key={"delimiter_" + prev.key} className="mx-1">
                |
              </span>,
              curr,
            ])
          : null}
      </div>

      <div className="row ms-3 pt-2">
        <h5>{props.parent.mkb_code + " - " + props.parent.title}</h5>
      </div>
    </div>
  );
}
