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
    stacked: false,
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
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
                yAxisID: "y2",
                // fill: false,
                data: result[0].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),

                borderColor: "rgb(255, 99, 132)",
              },
              {
                label: "Antarctic temperature",
                yAxisID: "y2",
                // fill: false,
                data: result[2].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "blue",
              },
              {
                label: "Carbon dioxide",
                yAxisID: "y1",
                data: result[4].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "green",
              },
              {
                label: "Oxygen isotopes",
                yAxisID: "y2",
                data: result[6].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "black",
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
