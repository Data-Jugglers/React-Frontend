import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V8() {
  const [v8, setV8] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v8");
      const json = await response.json();
      setV8(json);
      console.log(json.length);
      setIsLoading(false);
    };
    asyncFunction();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "CO2 emmsions by country",
        font: {
          size: 18,
        },
      },
      //   tooltip: {
      //     mode: "index",
      //   },
    },
    // interaction: {
    //   mode: "nearest",
    //   axis: "x",
    //   intersect: false,
    // },
    borderWidth: 1,
    pointRadius: 0,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
      },
      y: {
        stacked: true,
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
            datasets: v8.slice(0, 219).map((country) => ({
              label: v8[220][v8.indexOf(country)],
              data: country.map((item) => ({
                x: item.measurement_date,
                y: item.data,
              })),
              borderColor: "rgb(255, 99, 132, 0.8)",
              fill: "+1",
            })),
          }}
        />
        <div className="graphDescription">
          <p className="description">{v8[219][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to V8 <a href={v8[219][0].source_link}>source data.</a>
            <br />
            Link to official V8 data description:{" "}
            <a href={v8[219][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
