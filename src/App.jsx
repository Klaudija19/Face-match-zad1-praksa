import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center p-3">
      <div className="row w-100">
        <div className="col-12">
          <h1 className="mb-4 display-5 fw-bold text-primary">
            🎭 Face Matching Game
          </h1>
          <p className="text-secondary mb-5 fs-5">
            Select difficulty to start the game
          </p>
        </div>
      </div>

      <div className="row w-100 justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <button className="btn btn-success btn-lg w-100 w-sm-auto">
            Easy
          </button>
          <button className="btn btn-warning btn-lg w-100 w-sm-auto">
            Medium
          </button>
          <button className="btn btn-danger btn-lg w-100 w-sm-auto">
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

