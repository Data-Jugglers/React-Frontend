import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

export default function V9() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [labelsList, setLabelsList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [sectorLabelsList, setSectorLabelsList] = useState([]);
  const [sectorDataList, setSectorDataList] = useState([]);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3001/v9");
      const json = await response.json();
      setResult(json);
      console.log(json[0][0]);
      setLabelsList(json[0].map((item) => item["sector"].measurement_date));
      setDataList(json[0].map((item) => item["sector"].data));
      setIsLoading(false);
      let tempLabel = [];
      let tempData = [];
      for (let i = 0; i < json[0].length; i++) {
        for (let x = 0; x < json[0][i]["subSectors"].length; x++) {
          tempLabel.push(json[0][i]["subSectors"][x].category);
          tempData.push(json[0][i]["subSectors"][x].data);
        }
      }
      setSectorLabelsList(tempLabel);
      setSectorDataList(tempData);

      console.log(sectorLabelsList);
    };
    asyncFunction();
  }, []);
  function switchData() {
    if (dataList.length >= 4) {
      let temp = sectorDataList;
      setSectorDataList(dataList);
      setDataList(temp);
      temp = labelsList;
      setSectorLabelsList(sectorLabelsList);
      setLabelsList(temp);
    }
    let temp = dataList;
    setDataList(sectorDataList);
    setSectorDataList(temp);
    temp = labelsList;
    setLabelsList(sectorLabelsList);
    setSectorLabelsList(temp);
    return 0;
  }
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
          options={{
            onClick: (e) => {
              switchData();
            },
          }}
          data={{
            labels: labelsList,
            datasets: [
              {
                data: dataList,
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
