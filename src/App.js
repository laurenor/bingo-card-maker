import "./App.css";
import BingoCard from "./BingoCard";
import { useState } from "react";

const DEFAULT_NUM_CARDS = 1;
const DEFAULT_TITLE = "BINGO";

function App() {
  const [bingoValues, setBingoValues] = useState([]);
  const [numCards, setNumCards] = useState(DEFAULT_NUM_CARDS);
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setBValues(formJson.bingoValues);
    setTitle(formJson.title);
    setNumCards(parseInt(formJson.numCards));
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
    <div className="app">
      <form onSubmit={handleSubmit} class="bingo-form">
        <label>
          <div className="label-name">Title: </div>
          <input name="title" defaultValue={DEFAULT_TITLE} />
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

      {[...Array(numCards)].map((e, i) => (
        <BingoCard title={title} values={bingoValues} key={`card${i}`} />
      ))}
    </div>
  );
}

export default App;
