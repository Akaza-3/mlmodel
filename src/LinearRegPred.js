import React, { useState, useEffect } from "react";
import axios from "axios";
import SliderInput from "./SliderInput";
import { Line } from "react-chartjs-2";
import { Chart } from "react-google-charts";

function LinearRegPred() {
  const [qideka, setqideka] = useState(0.5);
  const [f50deol, setf50deol] = useState(50);
  const [qideol, setqideol] = useState(0.5);
  const [f50pt, setf50pt] = useState(50);
  const [qipt, setqipt] = useState(0.5);
  const [f50tr, setf50tr] = useState(50);
  const [qitr, setqitr] = useState(0.5);

  const [selectedOption, setSelectedOption] = useState(1000);
  const [graphData, setGraphData] = useState(["time", "value"]);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Live Prediction ( Linear Regression )",
        data: [],
        fill: false,
        borderColor: "rgb(0, 151, 67)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://127.0.0.1:5000/predict1/", {
          responseType: "json",
          params: {
            qideka: qideka,
            f50deol: f50deol,
            qideol: qideol,
            f50pt: f50pt,
            qipt: qipt,
            f50tr: f50tr,
            qitr: qitr,
          },
        })
        .then((response) => {
          const responseData = response.data.prediction;
          const newLabels = Date.now();
          setData((prevData) => ({
            labels: [...prevData.labels, newLabels],
            datasets: [
              {
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data, responseData],
              },
            ],
          }));
          const newLabelTemp = data.labels.slice(-1 * selectedOption);
          const newDataTemp = data.datasets[0].data.slice(-1 * selectedOption);

          const newChartData = [
            ["Time", "Value"],
            ...newLabelTemp.map((label, index) => [label, newDataTemp[index]]),
          ];

          setGraphData({
            newChartData,
          });

          console.log(data);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [qideka, f50deol, qideol, f50pt, qipt, f50tr, qitr, data]);

  const handleSliderChange1 = (event) => {
    setqideka(event.target.value);
  };
  const handleSliderChange2 = (event) => {
    setf50deol(event.target.value);
  };
  const handleSliderChange3 = (event) => {
    setqideol(event.target.value);
  };
  const handleSliderChange4 = (event) => {
    setf50pt(event.target.value);
  };
  const handleSliderChange5 = (event) => {
    setqipt(event.target.value);
  };
  const handleSliderChange6 = (event) => {
    setf50tr(event.target.value);
  };
  const handleSliderChange7 = (event) => {
    setqitr(event.target.value);
  };
  return (
    <div className="text-white p-3">
      <div>
        <label htmlFor="dropdown">Max points to select:</label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={1000}>All</option>
        </select>
      </div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={graphData.newChartData}
      />{" "}
      Slider setter:
      <div>
        qideka
        <SliderInput
          max={1}
          min={0}
          step={0.01}
          value={qideka}
          onChange={handleSliderChange1}
        />
      </div>
      <div>
        f50deol
        <SliderInput
          min={0}
          max={100}
          value={f50deol}
          onChange={handleSliderChange2}
        />
      </div>
      <div>
        qideol
        <SliderInput
          min={0}
          step={0.01}
          max={1}
          value={qideol}
          onChange={handleSliderChange3}
        />
      </div>
      <div>
        f50pt
        <SliderInput
          min={0}
          max={100}
          value={f50pt}
          onChange={handleSliderChange4}
        />
      </div>
      <div>
        qipt
        <SliderInput
          step={0.01}
          min={0}
          max={1}
          value={qipt}
          onChange={handleSliderChange5}
        />
      </div>
      <div>
        f50tr
        <SliderInput
          type="range"
          min={0}
          max={100}
          value={f50tr}
          onChange={handleSliderChange6}
        />
      </div>
      <div>
        qitr
        <SliderInput
          min={0}
          step={0.01}
          max={1}
          value={qitr}
          onChange={handleSliderChange7}
        />
      </div>
    </div>
  );
}

export default LinearRegPred;
