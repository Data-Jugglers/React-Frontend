import React, { startTransition } from "react";
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
    layout: {
      padding: 7,
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historic CO2 concentration in air",
        font: {
          size: 18,
        },
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    scales: {
      x: {
        reverse: true,
        type: "category",
        ticks: {
          autoskip: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Co2 concentration",
        },
      },
    },
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return (
      <div className="graphContainer">
        <div className="graph">
          <Line
            options={options}
            data={{
              datasets: [
                {
                  label: "CO2 years before persent",
                  data: v5[0].map((item) => ({
                    y: item.data,
                    // item.measurement_date = years before present
                    // 1998 = year when samples were taken
                    x: item.measurement_date - 1998 + " BC",
                  })),
                  borderColor: "rgb(255, 99, 132, 0.8)",
                },
              ],
            }}
          />
        </div>
        <div className="graphDescription">
          <p className="description">{v5[1][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to CDIAC <a href={v5[1][0].source_link}>source data.</a>
            <br />
            Link to official CDIAC data description:{" "}
            <a href={v5[1][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
