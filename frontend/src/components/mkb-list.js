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
              <span
                className="scroll-pos"
                style={{ scrollMarginTop: props.navTreeHeight }}
                ref={(el) =>
                  (props.scrollRefs.current[String(item.mkb_code)] = el)
                }
              />

              <MKBItem item={item} editItemHandler={props.editItemHandler} />
            </li>
          ))}
      </ol>
    </React.Fragment>
  );
}
