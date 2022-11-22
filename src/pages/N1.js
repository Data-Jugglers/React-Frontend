import React from "react";
import { V1 } from "../components";
import V3 from "../components/V3";

import "../styles/graphComponent.css";

export default function N1() {
  return (
    <>
      <div className="visualizations">
        <V1 />
        <V3 />
      </div>
    </>
  );
}
