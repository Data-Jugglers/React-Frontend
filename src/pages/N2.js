import React from "react";
import { V8, V9 } from "../components";
import "../styles/graphComponent.css";

export default function N2() {
  return (
    <>
      <div className="visualizations">
        <V8 />
        <V9 />
      </div>
    </>
  );
}
