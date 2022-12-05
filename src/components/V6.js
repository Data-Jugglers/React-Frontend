import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V6() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v6");
      const json = await response.json();
      setResult(json);
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
        text: "Ice Core CO2",
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    scales: {
      x: {
        reverse: true,
        type: "category",
        time: {
          unit: "year",
        },
      },
    },
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return (
      <div className="graphContainer">
        <Line
          options={options}
          data={{
            datasets: [
              {
                label: "800k Year CO2 measurements",
                data: result[0].map((item) => ({
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
