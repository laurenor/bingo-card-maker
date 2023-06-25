import { useState, useEffect } from "react";
import { getRandom } from "./utils";

export default function GameModal({ values, handleClose }) {
  const [calledItems, setCalledItems] = useState(new Set([]));
  const [vals, setVals] = useState(new Set([...values]));
  const [currCalledItem, setCurrCalledItem] = useState("");
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const [shouldShowSubmittedResult, setShouldShowSubmittedResult] =
    useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const resetOnClose = () => {
    setCalledItems(new Set([]));
    setVals(new Set([...values]));
    setCurrCalledItem("");
    setHasBeenCalled(false);
    setShouldShowSubmittedResult(false);
  };

  const onClose = () => {
    document.body.style.overflow = "scroll";
    if (
      window.confirm(
        "Are you sure you want to close the modal? If you close, your game will restart."
      ) === true
    ) {
      resetOnClose();
      handleClose();
    }
  };

  const selectItem = () => {
    const randVal = getRandom([...vals]);
    const calledCopy = new Set([...calledItems]);
    calledCopy.add(randVal);
    setCalledItems(calledCopy);
    setCurrCalledItem(randVal);
    const valsCopy = new Set([...vals]);
    valsCopy.delete(randVal);
    setVals(valsCopy);
  };

  const checkIfCalled = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const val = formJson.calledItem;
    setShouldShowSubmittedResult(true);
    return setHasBeenCalled(calledItems.has(val));
  };

  const handleInputChange = () => {
    setShouldShowSubmittedResult(false);
  };

  return (
    <div class="game-modal-container">
      <div class="game-modal">
        <div class="game-modal-contents">
          <button onClick={onClose} class="close-modal-btn">
            Close x
          </button>
          <div class="called-items">
            <div className="called-copy">Called item: </div>
            <div
              class={`called-item-text ${
                currCalledItem.length < 1 && "none-called"
              }`}
            >
              {currCalledItem.length > 0 ? currCalledItem : "N/A"}
            </div>
          </div>
          <div className="selections-left-copy">
            Possible selections left: {vals.size}
          </div>
          <div class="call-btn-container">
            <button onClick={selectItem} disabled={vals.size < 1}>
              {vals.size > 0 ? "Call" : "None left to call"}
            </button>
          </div>
          <form onSubmit={checkIfCalled} class="called-items-form">
            <div class="label">Has been called?</div>
            <div class="game-input">
              <input
                name="calledItem"
                placeholder="Bingo item"
                onChange={handleInputChange}
              />
              {shouldShowSubmittedResult && (
                <div>
                  {hasBeenCalled ? (
                    <span style={{ color: "green" }}>Yes</span>
                  ) : (
                    <span style={{ color: "red" }}>No</span>
                  )}
                </div>
              )}
            </div>

            <button>Submit</button>
          </form>

          <div>
            <label class="label">Called items:</label>{" "}
            <textarea value={[...calledItems]} />
          </div>
        </div>
      </div>
    </div>
  );
}
