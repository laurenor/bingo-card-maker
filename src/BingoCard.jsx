import { useState, useEffect } from "react";
import { shuffle } from "./utils";
import RemyBingo from "./img/remy_bingo.png";

const DEFAULT_CARD_VALUES = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "FREE", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export default function BingoCard({ values, title, freeType }) {
  const [cardVals, setCardVals] = useState(DEFAULT_CARD_VALUES);

  // initialize vals
  useEffect(() => {
    if (values.length < 1) {
      setCardVals([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "FREE", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ]);
      return;
    }

    const vals = values.length >= 2 ? shuffle([...values]) : values;
    const cardValsCopy = [...cardVals];
    for (let i = 0; i < cardVals.length; i++) {
      const row = cardVals[i];
      for (let j = 0; j < row.length; j++) {
        const val = row[j];
        if (val !== "FREE") {
          if (vals.length) {
            cardVals[i][j] = vals.pop();
          } else {
            break;
          }
        }
      }
    }
    setCardVals(cardValsCopy);
  }, [values]);

  useEffect(() => {
    console.log({ cardVals });
  }, [cardVals]);

  return (
    <div class="bingo-card">
      <div class="bingo-header">{title}</div>
      {cardVals.map((row, i) => {
        return (
          <div class="bingo-row" key={`row${i}`}>
            {row.map((val, j) => {
              return (
                <div class="bingo-val" key={`val${j}`}>
                  {val === "FREE" && freeType === "remy" ? (
                    <img
                      src={RemyBingo}
                      alt="Remy Free Spot"
                      class="free-img"
                    />
                  ) : (
                    val
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
