import React from "react";
import { Chart } from "chart.js/auto";
import { Line, Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V7() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v7");
      const json = await response.json();
      setResult(json);
      console.log(json);
      setIsLoading(false);
    };
    asyncFunction();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Evolution of global temperature over the past two million years",
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    showLine: true,
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return (
      <div className="graphContainer">
        <Scatter
          options={options}
          data={{
            datasets: [
              {
                label: "GAST reconstruction",
                data: result[0].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(255, 99, 132)",
              },
              {
                label: "Antarctic temperature",
                data: result[2].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(255, 99, 132)",
              },
              {
                label: "Carbon dioxide",
                data: result[4].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(15, 15, 32)",
              },
              {
                label: "Oxygen isotopes",
                data: result[6].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(255, 99, 132)",
              },
            ],
          }}
        />
        <div className="graphDescription">
          <p>{result[1][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to the source:{" "}
            <a href={result[1][0].source_link}>source data</a>
            <br />
            Link to the data measurement description:{" "}
            <a href={result[1][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
