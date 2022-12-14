import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V8() {
  const [v8, setV8] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortV8 = (json) => {
    let returnArray = [];
    for (let i = 0; i < json.length - 2; i++) {
      const element = json[i].map((country) => ({
        measurement_date: country.measurement_date,
        data: country.data,
        countryName: json[220][i],
      }));
      returnArray.push(element);
    }
    returnArray.sort((a, b) => {
      return a[a.length - 1].data - b[b.length - 1].data;
    });
    returnArray.push(json[219]);
    return returnArray;
  };

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v8");
      const json = await response.json();
      setV8(sortV8(json));
      setIsLoading(false);
    };
    asyncFunction();
    console.log(v8);
  }, []);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 256);
  };

  const setRandomColor = () => {
    return (
      "rgb(" +
      getRandomNumber() +
      ", " +
      getRandomNumber() +
      ", " +
      getRandomNumber() +
      ")"
    );
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.7,
    plugins: {
      legend: {
        position: "top",
        display: true,

        labels: {
          padding: 2,
          boxWidth: 10,
          maxHeight: 10,
          font: {
            size: 9,
          },
        },
      },
      title: {
        display: true,
        text: "CO2 emission by country",
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
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Million tonnes of CO2",
        },
      },
    },
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return (
      <div className="graphContainer">
        <div className="graph-v8">
          <Line
            options={options}
            data={{
              datasets: v8.slice(0, 219).map((country) => ({
                label: country[0].countryName,
                data: country.map((item) => ({
                  x: item.measurement_date,
                  y: item.data * 3.664,
                })),
                borderColor: setRandomColor(),
                // fill: "+1",
              })),
            }}
          />
        </div>
        <div className="graphDescription">
          <p className="description">{v8[219][0].description}</p>
        </div>
        <div className="graphLinks">
          <p className="link">
            Link to <a href={v8[219][0].source_link}>source data.</a>
            <br />
            Link to official data description:{" "}
            <a href={v8[219][0].description_link}>description</a>
          </p>
        </div>
      </div>
    );
  }
}
