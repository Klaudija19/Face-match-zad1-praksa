import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./Board";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);

  if (difficulty) {
    return <Board difficulty={difficulty} onRestart={() => setDifficulty(null)} />;
  }

  return (
    <div className="menu-container">
      <h1>🎭 Face Matching Game</h1>
      <p>Select a difficulty level to start</p>

      <div className="menu-buttons d-flex gap-3">
        <button
          className="btn btn-success btn-lg"
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>
        <button
          className="btn btn-danger btn-lg"
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </div>
    </div>
  );
}





