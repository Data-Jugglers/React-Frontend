import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function V1() {
  const [result1, setResult1] = useState([]);
  const [result2, setResult2] = useState([]);
  const [result3, setResult3] = useState([]);
  const [result4, setResult4] = useState([]);
  const [result5, setResult5] = useState([]);
  const [result6, setResult6] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      const response1 = await fetch("http://localhost:3001/1");
      const json1 = await response1.json();
      setResult1(json1);
      const response2 = await fetch("http://localhost:3001/2");
      const json2 = await response2.json();
      setResult2(json2);
      const response3 = await fetch("http://localhost:3001/3");
      const json3 = await response3.json();
      setResult3(json3);
      const response4 = await fetch("http://localhost:3001/4");
      const json4 = await response4.json();
      setResult4(json4);
      const response5 = await fetch("http://localhost:3001/5");
      const json5 = await response5.json();
      setResult5(json5);
      const response6 = await fetch("http://localhost:3001/6");
      const json6 = await response6.json();
      setResult6(json6);
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
        text: "Chart.js Line Chart",
      },
    },
    borderWidth: 1,
    pointRadius: 0,
  };

  const dataSet = (int) => {
    switch (int) {
      case 4:
        let returnArray4 = [];
        let pos4 = 0;
        for (let i = 0; i < result4.length; i++) {
          const object = {
            x: result1[pos4].measurement_date,
            y: result4[i].data,
          };
          returnArray4.push(object);
          pos4 += 12;
        }
        return returnArray4;
      case 5:
        let returnArray5 = [];
        let pos5 = 0;
        for (let i = 0; i < result5.length; i++) {
          const object = {
            x: result1[pos5].measurement_date,
            y: result5[i].data,
          };
          returnArray5.push(object);
          pos5 += 12;
        }
        return returnArray5;
      case 6:
        let returnArray6 = [];
        let pos6 = 0;
        for (let i = 0; i < result6.length; i++) {
          const object = {
            x: result1[pos6].measurement_date,
            y: result6[i].data,
          };
          returnArray6.push(object);
          pos6 += 12;
        }
        return returnArray6;
      default:
        return "Something went wrong when assigning data";
    }
  };

  const data = {
    labels: result1.map((item) => item.measurement_date),
    datasets: [
      {
        label: "Dataset 1",
        data: result1.map((item) => item.data),
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: result2.map((item) => item.data),
        borderColor: "rgb(45, 199, 232)",
      },
      {
        label: "Dataset 3",
        data: result3.map((item) => item.data),
        borderColor: "rgb(2, 233, 32)",
      },
      {
        label: "Dataset 4",
        data: dataSet(4),
        borderColor: "rgb(15, 15, 32)",
      },
      {
        label: "Dataset 5",
        data: dataSet(5),
        borderColor: "rgb(155, 130, 213)",
      },
      {
        label: "Dataset 6",
        data: dataSet(6),
        borderColor: "rgb(88, 15, 32)",
      },
    ],
  };

  if (isLoading) {
    return <p>Loading... </p>;
  } else {
    return <Line options={options} data={data} />;
  }
}
