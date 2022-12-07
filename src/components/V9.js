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
  const [labelsList2, setLabelsList2] = useState([]);
  const [dataList2, setDataList2] = useState([]);
  const [isSubSector, setIsSubSector] = useState(false);
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
    };
    asyncFunction();
  }, []);
  function switchData(label) {
    if (isSubSector) {
      let temp = labelsList;
      setLabelsList(labelsList2);
      setLabelsList2(temp);
      temp = dataList;
      setDataList(dataList2);
      setDataList2(temp);

      setIsSubSector(false);
    } else {
      for (const element of result[0]) {
        if (element.sector.measurement_date == label) {
          setDataList2(dataList);
          setDataList(element["subSectors"].map((subSector) => subSector.data));
          setLabelsList2(labelsList);
          setLabelsList(
            element["subSectors"].map((subSector) => subSector.category)
          );
          setIsSubSector(true);
        }
      }
    }
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
            onClick: function (e, activeEls) {
              let dataIndex = activeEls[0].index;
              let label = e.chart.data.labels[dataIndex];
              switchData(label);
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
