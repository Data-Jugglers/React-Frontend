import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V3() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v3");
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
        text: "Atmospheric CO2 concentrations",
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
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
                label: "Global monthly",
                data: result[0].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(255, 99, 132)",
              },

              {
                label: "Global yearly",
                data: result[1].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(15, 15, 32)",
              },
            ],
          }}
        />
        <a href={result[2][0].source_link}>Source Link</a>
        <a href={result[2][0].description_link}>Description Link</a>
        <p>{result[2][0].description}</p>
      </div>
    );
  }
}
