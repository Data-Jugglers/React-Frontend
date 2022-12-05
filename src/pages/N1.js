import React from "react";

import V4 from "../components/V4";
import V9 from "../components/V9";

import { V1, V3, V5, V7 } from "../components";

import "../styles/graphComponent.css";

export default function N1() {
  return (
    <>
      <div className="visualizations">
        <V1 />
        <V3 />

        <V4 />
        <V5 />
        <V7 />
        <V9 />
      </div>
    </>
  );
}
