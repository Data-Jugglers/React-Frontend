import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { V1, V3, V4, V5, V6, V7, V8, V9 } from "../components";
import "../styles/custom.css";
import { useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3001/";

export default function Custom() {
  const routeParams = useParams();
  const [notFound, setNotFound] = useState(true);
  const [viewJson, setViewJson] = useState();

  useEffect(() => {
    axios
      .get(URL + "view/" + routeParams.id)
      .then((response) => {
        setViewJson(response.data[0].viewjson);
        console.log(response.data[0].viewjson);
        setNotFound(false);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  if (notFound) return <NotFound />;

  if (viewJson.second.length < 1)
    return (
      <div className="visualizations">
        {viewJson.first.map((item) => {
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

  if (viewJson.second.length > 0)
    return (
      <div className="twoColumns">
        <div className="customColumn">
          {viewJson.first.map((item) => {
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
          {viewJson.second.map((item) => {
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
