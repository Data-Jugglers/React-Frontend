import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V5() {
  const [v5, setV5] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v5");
      const json = await response.json();
      setV5(json);
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
        text: "Historic temperature anomalies",
        font: {
          size: 18,
        },
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    scales: {
      x: {
        type: "time",
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
                label: "Global Monthly",
                data: v5[0].map((item) => ({
                  x: item.measurement_date,
                  y: item.data,
                })),
                borderColor: "rgb(255, 99, 132, 0.8)",
              },
            ],
          }}
        />
        <div className="graphDescription">
          <p className="description">{v5[1][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to HadCRUT5 <a href={v5[1][0].source_link}>source data.</a>
            <br />
            Link to official HadCRUT5 data description:{" "}
            <a href={v5[1][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
