import { useState, useEffect } from "react";
import { shuffle } from "./utils";
export default function BingoCard({ values }) {
  const [cardVals, setCardVals] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "FREE", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  // initialize vals
  useEffect(() => {
    if (values.length < 2) return;
    const shuffledVals = shuffle([...values]);
    const cardValsCopy = [...cardVals];
    for (let i = 0; i < cardVals.length; i++) {
      const row = cardVals[i];
      for (let j = 0; j < row.length; j++) {
        const val = row[j];
        if (val !== "FREE") {
          if (shuffledVals.length) {
            cardVals[i][j] = shuffledVals.pop();
          } else {
            break;
          }
        }
      }
    }
    setCardVals(cardValsCopy);
  }, [values]);

  return (
    <div class="bingo-card">
      {cardVals.map((row) => {
        return (
          <div class="bingo-row">
            {row.map((val) => {
              return <div class="bingo-val">{val}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
