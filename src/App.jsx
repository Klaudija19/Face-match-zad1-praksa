import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <h1 className="mb-4 display-4 fw-bold text-primary">
        🎭 Face Matching Game
      </h1>
      <p className="text-secondary mb-5 fs-5">
        Select difficulty to start the game
      </p>

      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
        <button className="btn btn-success btn-lg px-5 py-3">Easy</button>
        <button className="btn btn-warning btn-lg px-5 py-3">Medium</button>
        <button className="btn btn-danger btn-lg px-5 py-3">Hard</button>
      </div>
    </div>
  );
}



