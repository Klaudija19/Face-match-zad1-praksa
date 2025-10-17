import React from "react";

export default function Board({ difficulty, onRestart }) {
  const getNumberOfCards = () => {
    switch (difficulty) {
      case "easy":
        return 4;
      case "medium":
        return 8;
      case "hard":
        return 12;
      default:
        return 4;
    }
  };

  const cards = Array.from({ length: getNumberOfCards() }, (_, i) => i + 1);

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h2 className="mb-4 text-capitalize">{difficulty} Mode</h2>

      <div
        className="d-grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card}
            className="bg-secondary rounded-3 d-flex justify-content-center align-items-center"
            style={{ height: "100px", fontSize: "1.5rem" }}
          >
            {card}
          </div>
        ))}
      </div>

      <button className="btn btn-light mt-5 px-4 py-2" onClick={onRestart}>
        🔙 Back to Menu
      </button>
    </div>
  );
}

