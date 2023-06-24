import "./App.css";
import BingoCard from "./BingoCard";
import { useState, useEffect } from "react";

const NUM_BINGO_VALUES = 24; // 1 free spot

function App() {
  const [bingoValues, setBingoValues] = useState([]);
  const [numCards, setNumCards] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setBValues(formJson.bingoValues);
    setNumCards(formJson.numCards);
  };

  const setBValues = (values) => {
    const parsedValues = values
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    setBingoValues(parsedValues);
    return parsedValues;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Num Cards: <input name="numCards" defaultValue={1} />
        </label>

        <label>
          Bingo values: <textarea name="bingoValues" defaultValue="" />
        </label>

        <button type="reset">Reset form</button>
        <button type="submit">Submit form</button>
      </form>
      {/* <ul>
        {bingoValues.map((val) => (
          <li>{val}</li>
        ))}
      </ul> */}
      Num Cards: <input value={numCards} disabled />
      Bingo Values: <textarea value={bingoValues} />
      <BingoCard values={bingoValues} />
    </div>
  );
}

export default App;
