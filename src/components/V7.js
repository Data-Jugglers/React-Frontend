import React from "react";
import { Chart } from "chart.js/auto";
import { Line, Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V7() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [v10, setV10] = useState([]);

  useEffect(() => {
    const asyncFunction = async () => {
      const response1 = await fetch("http://localhost:3001/v7");
      const json1 = await response1.json();
      setResult(json1);
      const response2 = await fetch("http://localhost:3001/v10");
      const json2 = await response2.json();
      setV10(json2);
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
      tooltip: {
        callbacks: {
          label: function (dataset) {
            if (dataset.datasetIndex == 2) {
              return v10[1][dataset.dataIndex].string;
            } else {
              return dataset.raw.y;
            }
          },
        },
      },
    },
    borderWidth: 1,
    pointRadius: 0,
    showLine: true,
    stacked: false,
    scales: {
      x: {
        // reverse: true,
        type: "linear",
        max: 2022,
        title: {
          display: true,
          text: "Time in years",
        },
      },
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
      Y_history: {
        display: false,
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
                  label: "GAST reconstruction",
                  yAxisID: "y2",
                  // fill: false,
                  data: result[0].map((item) => ({
                    x: 2022 - item.measurement_date,
                    y: item.data,
                  })),

                  borderColor: "rgb(255, 99, 132)",
                },
                // {
                //   label: "Antarctic temperature",
                //   yAxisID: "y2",
                //   // fill: false,
                //   data: result[2].map((item) => ({
                //     x: item.measurement_date,
                //     y: item.data,
                //   })),
                //   borderColor: "blue",
                // },
                {
                  label: "Carbon dioxide",
                  yAxisID: "y1",
                  data: result[4].map((item) => ({
                    x: 2022 - item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "green",
                },
                // {
                //   label: "Oxygen isotopes",
                //   yAxisID: "y2",
                //   data: result[6].map((item) => ({
                //     x: item.measurement_date,
                //     y: item.data,
                //   })),
                //   borderColor: "black",
                // },
                {
                  label: "History",
                  yAxisID: "Y_history",
                  data: v10[1].map((item) => ({
                    x: 2022 - item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "brown",
                  showLine: false,
                  hidden: false,
                  pointStyle: "circle",
                  pointRadius: 5,
                  pointHoverRadius: 15,
                },
              ],
            }}
          />
        </div>
        <div className="graphDescription">
          <p className="description">{result[1][0].description}</p>
          <p className="description">{v10[2][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to the source:{" "}
            <a href={result[1][0].source_link}>source data</a>
            <br />
            Link to the data measurement description:{" "}
            <a href={result[1][0].description_link}>description</a>
          </p>
          <p className="link">
            Link to Milestones in Evolution and History:{" "}
            <a href={v10[2][0].source_link}>source data</a>
            <br />
            Link to data description:{" "}
            <a href={v10[2][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
