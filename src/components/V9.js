import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V9() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v9");
      const json = await response.json();
      setResult(json);
      console.log(json[0][0]);
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
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return (
      <div className="graphContainer">
        <Pie
          data={{
            labels: result[0].map((item) => item["sector"].measurement_date),
            datasets: [
              {
                data: result[0].map((item) => item["sector"].data),
                backgroundColor: [
                  "red",
                  "green",
                  "orange",
                  "purple",
                  "cyan",
                  "blue",
                ],
              },
            ],
          }}
        ></Pie>
      </div>
    );
  }
}
