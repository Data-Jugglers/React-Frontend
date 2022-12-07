import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V1() {
  const [v1, setV1] = useState([]);
  const [v2, setV2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v1");
      const json = await response.json();
      setV1(json);
      const response2 = await fetch("http://localhost:3001/v2");
      const json2 = await response2.json();
      setV2(json2);
      setIsLoading(false);
    };
    asyncFunction();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        <div className="graph">
          <Line
            options={options}
            data={{
              datasets: [
                {
                  label: "Global Monthly",
                  data: v1[0].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(255, 99, 132, 0.8)",
                },
                {
                  label: "Global Annual",
                  data: v1[3].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(255, 99, 132)",
                },
                {
                  label: "Northern Monthly",
                  data: v1[1].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(45, 199, 232, 0.8)",
                },
                {
                  label: "Northern Annual",
                  data: v1[4].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(45, 199, 232)",
                },
                {
                  label: "Southern Monthly",
                  data: v1[2].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(2, 233, 32, 0.8)",
                },
                {
                  label: "Southern Annual",
                  data: v1[5].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(2, 233, 32)",
                },
                {
                  label: "Past 2000 years",
                  data: v2[0].map((item) => ({
                    x: item.measurement_date,
                    y: item.data,
                  })),
                  borderColor: "rgb(50,30,70)",
                },
              ],
            }}
          />
        </div>
        <div className="graphDescription">
          <p className="description">{v1[6][0].description}</p>
          <p className="description">{v2[1][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to HadCRUT5 <a href={v1[6][0].source_link}>source data.</a>
            <br />
            Link to official HadCRUT5 data description:{" "}
            <a href={v1[6][0].description_link}>description</a>
          </p>
          <p className="link">
            Link to 2,000-year temperature reconstruction{" "}
            <a href={v2[1][0].source_link}>source data</a>
            <br />
            Link to 2,000-year temperature reconstruction description:{" "}
            <a href={v2[1][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
