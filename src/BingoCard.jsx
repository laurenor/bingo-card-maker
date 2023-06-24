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
    if (values.length < 2) {
      console.log("HELLO", values.length);
      if (values.length < 1) {
        console.log("should reset");
        setCardVals(DEFAULT_CARD_VALUES);
      }
    } else {
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
    }
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
