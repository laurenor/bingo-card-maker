import "./App.css";
import BingoCard from "./BingoCard";
import { useState } from "react";

const DEFAULT_BINGO_VALUES = [];
const DEFAULT_NUM_CARDS = 1;
const DEFAULT_TITLE = "BINGO";
const DEFAULT_FREE_TYPE = "default";

function App() {
  const [bingoValues, setBingoValues] = useState(DEFAULT_BINGO_VALUES);
  const [numCards, setNumCards] = useState(DEFAULT_NUM_CARDS);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [freeType, setFreeType] = useState(DEFAULT_FREE_TYPE);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setBingoValues(setBValues(formJson.bingoValues));
    setTitle(formJson.title);
    setFreeType(formJson.freeType);
    setNumCards(parseInt(formJson.numCards));
  };

  const handleReset = (e) => {
    setBingoValues(DEFAULT_BINGO_VALUES);
    setTitle(DEFAULT_TITLE);
    setFreeType(DEFAULT_FREE_TYPE);
    setNumCards(DEFAULT_NUM_CARDS);
  };

  const setBValues = (values) => {
    const parsedValues = values
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    return parsedValues;
  };

  return (
    <div className="app">
      <div class="controls">
        <button>Start Game</button>
        <form onSubmit={handleSubmit} onReset={handleReset} class="bingo-form">
          <label>
            <div className="label-name">Title: </div>
            <input name="title" defaultValue={DEFAULT_TITLE} />
          </label>

          <label>
            <div className="label-name">Free spot type: </div>
            <select name="freeType" id="freeType">
              <option value="default">Default</option>
              <option value="remy">Remy</option>
            </select>
          </label>

          <label>
            <div className="label-name">Num cards: </div>
            <input
              name="numCards"
              type="number"
              defaultValue={DEFAULT_NUM_CARDS}
              min="1"
            />
          </label>

          <label>
            <div className="label-name">Bingo Values (comma separated): </div>{" "}
            <textarea name="bingoValues" defaultValue="" />
          </label>

          <button type="reset">Reset form</button>
          <button type="submit">Submit form</button>
        </form>
      </div>

      {[...Array(numCards)].map((e, i) => (
        <BingoCard
          freeType={freeType}
          title={title}
          values={bingoValues}
          key={`card${i}`}
        />
      ))}
    </div>
  );
}

export default App;
