import { useState } from "react";
import Advertising from "./Advertising";
import LinearRegPred from "./LinearRegPred";

function App() {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange =(e) => {
    setSelectedOption(parseInt(e.target.value));
  }

  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen">
      <div className="inline-block border-white border-2 rounded-lg p-2 my-4">
        <label htmlFor="dropdown" className="text-white">Select a page to look at: {"  "}</label>
        <select className="text-white bg-black" id="dropdown" value={selectedOption} onChange={handleOptionChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
      {/* <Advertising /> */}
      {selectedOption===1 && <Advertising/>}
      {selectedOption===2 && <LinearRegPred />}
    </div>
  );
}

export default App;
