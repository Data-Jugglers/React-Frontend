import React from "react";
import { V1 } from "../components";
import V3 from "../components/V3";
import V4 from "../components/V4";

import "../styles/graphComponent.css";

export default function N1() {
  return (
    <>
      <div className="visualizations">
        <V1 />
        <V3 />
        <V4 />
      </div>
    </>
  );
}
