import React from "react";
import { useState } from "react";
import NotFound from "./NotFound";
import { V1, V3, V4, V5, V6, V7, V8, V9 } from "../components";
import "../styles/custom.css";

const dummy = {
  viewName: "First View",
  first: [
    { position: 1, graph: "V1" },
    { position: 2, graph: "V5" },
    { position: 2, graph: "V7" },
  ],
  second: [
    { position: 1, graph: "V5" },
    { position: 2, graph: "V5" },
  ],
};

export default function Custom() {
  const [notFound, setNotFound] = useState(true);
  const [viewJson, setViewJson] = useState();

  // make /get call to backend
  // check if URL has matching View
  // if yes -> retrieve View from database and store as State variable
  // set notFound to false
  // loop through the viewJson variable to create custom view (replace "dummy" by "viewJson")

  if (notFound) return <NotFound />;

  if (dummy.second.length < 1)
    return (
      <div className="visualizations">
        {dummy.first.map((item) => {
          switch (item.graph) {
            case "V1":
              return <V1 />;
            case "V3":
              return <V3 />;
            case "V4":
              return <V4 />;
            case "V5":
              return <V5 />;
            case "V6":
              return <V6 />;
            case "V7":
              return <V7 />;
            case "V8":
              return <V8 />;
            case "V9":
              return <V9 />;
            default:
              break;
          }
        })}
      </div>
    );

  if (dummy.second.length > 0)
    return (
      <div className="twoColumns">
        <div className="customColumn">
          {dummy.first.map((item) => {
            switch (item.graph) {
              case "V1":
                return <V1 />;
              case "V3":
                return <V3 />;
              case "V4":
                return <V4 />;
              case "V5":
                return <V5 />;
              case "V6":
                return <V6 />;
              case "V7":
                return <V7 />;
              case "V8":
                return <V8 />;
              case "V9":
                return <V9 />;
              default:
                break;
            }
          })}
        </div>
        <div className="customColumn">
          {dummy.second.map((item) => {
            switch (item.graph) {
              case "V1":
                return <V1 />;
              case "V3":
                return <V3 />;
              case "V4":
                return <V4 />;
              case "V5":
                return <V5 />;
              case "V6":
                return <V6 />;
              case "V7":
                return <V7 />;
              case "V8":
                return <V8 />;
              case "V9":
                return <V9 />;
              default:
                break;
            }
          })}
        </div>
      </div>
    );
}
