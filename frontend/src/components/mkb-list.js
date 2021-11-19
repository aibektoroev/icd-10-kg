import React from "react";
import MKBItem from "./mkb-item";

export default function MKBList(props) {
  return (
    <React.Fragment>
      <ol className="list-group list-group-numbered">
        {/* eslint-disable-next-line */}

        {props.items &&
          props.items.map((item) => (
            <li key={item.id} className="list-group-item rounded m-0 p-1">
              {/* eslint-disable-next-line */}
              <a
                id={"anchor-at-" + item.mkb_code}
                className="anchor"
                href="/#"
                style={{ scrollMarginTop: props.navTreeHeight }}
              />
              <MKBItem
                item={item}
                onTitleClicked={props.onTitleClicked}
                onEmbeddedLinkClicked={props.onEmbeddedLinkClicked}
                editItemHandler={props.editItemHandler}
              />
            </li>
          ))}
      </ol>
    </React.Fragment>
  );
}
