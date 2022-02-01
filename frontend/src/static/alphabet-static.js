import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chemicals from "./components/chemicals";
import Static1 from "./components/static_1";
import Static2 from "./components/static_2";
import Static3 from "./components/static_3";

export default function AlphabetStatic(props) {
  const { component_name, group_id } = useParams();

  const components = {
    1: Static1,
    2: Static2,
    3: Static3,
    4: Chemicals,
  };

  const Component = components[component_name];

  return (
    <React.Fragment>
      <div className="wrapper">
        <Component group_id={group_id} />
      </div>
    </React.Fragment>
  );
}
