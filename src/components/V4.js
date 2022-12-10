import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V4() {
  const [v3, setV3] = useState([]);
  const [v4, setv4] = useState([]);
  const [v10, setV10] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v3");
      const json = await response.json();
      setV3(json);
      const response2 = await fetch("http://localhost:3001/v4");
      const json2 = await response2.json();
      setv4(json2);
      const response3 = await fetch("http://localhost:3001/v10");
      const json3 = await response3.json();
      setV10(json3);
      setIsLoading(false);
    };
    asyncFunction();
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historical CO2 Record",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (dataset) {
            if (dataset.datasetIndex == 4) {
              return v10[0][dataset.dataIndex].string;
            } else {
              return dataset.raw.y;
            }
          },
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
        <div className="graph">
          <Line
            options={options}
            data={{
              datasets: [
                {
                  label: "CO2 Mixing Ratio",
                  data: v4[0].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgba(153, 102, 255, 1)",
                },
                {
                  label: "CO2 Mixing Ratio, 20 Year Smoothed, ppm",
                  data: v4[1].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgba(255, 206, 86, 1)",
                },
                {
                  label: "CO2 Mixing Ratio, 75 Year Smoothed, ppm",
                  data: v4[2].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgba(75, 192, 192, 1)",
                },
                {
                  label: "Mauna LOA Global Annual",
                  data: v3[1].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(255, 99, 132)",
                },
                {
                  label: "History",
                  data: v10[0].map((item) => ({
                    x: item.measurement_date,
                    y: 310,
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
          <p className="description">{v4[3][0].description}</p>
          <p className="description">{v3[2][0].description}</p>
          <p className="description">{v10[2][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to the Antarctic Ice Core Records{" "}
            <a href={v4[3][0].source_link}>source data.</a>
            <br />
            Link to the Antarctic Ice Core official description:{" "}
            <a href={v4[3][0].description_link}>description</a>
          </p>
          <p className="link">
            Link to the Mauna LOA measurements{" "}
            <a href={v3[2][0].source_link}>source data</a>
            <br />
            Link to the Mauna Loa official description:{" "}
            <a href={v3[2][0].description_link}>description</a>
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
