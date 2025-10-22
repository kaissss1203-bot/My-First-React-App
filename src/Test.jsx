import React, { useRef } from "react";
import "./MatchPoint.css";

const MatchPoint = () => {
  const colsRef = useRef([]);

  const hideColumns = async () => {
    const cols = colsRef.current;
    for (let i = cols.length - 1; i >= 0; i--) {
      cols[i].classList.add("hide");
      cols[i].classList.remove("show");
      await new Promise((r) => setTimeout(r, 200)); // right to left
    }
  };

  const showColumns = async () => {
    const cols = colsRef.current;
    for (let i = 0; i < cols.length; i++) {
      cols[i].classList.remove("hide");
      cols[i].classList.add("show");
      await new Promise((r) => setTimeout(r, 200)); // left to right
    }
  };

  return (
    <div className="match-wrapper">
      <div className="match-container">
        <div className="match-title">Match Point</div>

        <div className="match-board">
          {[
            {
              className: "player-col",
              cells: ["Player A", "Player B"],
            },
            {
              className: "score-col",
              cells: ["0", "0"],
            },
            {
              className: "score-col",
              cells: ["0", "0"],
              highlight: true,
            },
            {
              className: "score-col",
              cells: ["0", "0"],
            },
          ].map((col, i) => (
            <div
              key={i}
              className={`col ${col.className} show`}
              ref={(el) => (colsRef.current[i] = el)}
            >
              {col.cells.map((text, j) => (
                <div
                  key={j}
                  className={`cell ${col.highlight ? "highlight" : ""}`}
                >
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={hideColumns}>Hide Columns</button>
        <button onClick={showColumns}>Show Columns</button>
      </div>
    </div>
  );
};

export default MatchPoint;