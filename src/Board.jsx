import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Board({ difficulty, onRestart }) {
  const imageList = [
    "/src/assets/face1.png",
    "/src/assets/face2.png",
    "/src/assets/face3.png",
    "/src/assets/face4.png",
    "/src/assets/face5.png",
    "/src/assets/face6.png",
  ];

  const getNumberOfPairs = () => {
    switch (difficulty) {
      case "easy":
        return 2;
      case "medium":
        return 4;
      case "hard":
        return 6;
      default:
        return 2;
    }
  };

  const getTimeLimit = () => {
    switch (difficulty) {
      case "easy":
        return 30;
      case "medium":
        return 45;
      case "hard":
        return 60;
      default:
        return 30;
    }
  };

  const generateCards = () => {
    const pairs = imageList.slice(0, getNumberOfPairs());
    const cards = [...pairs, ...pairs]
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    return cards;
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeLimit());
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // 🕓 Countdown Timer
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setMessage("⏰ Time’s up!");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  // 🧩 Handle flipping logic
  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || gameOver) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flippedCards, card];
    setCards(newCards);
    setFlippedCards(newFlipped);
  };

  // 🧠 Matching logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.image === second.image) {
        setCards((prev) =>
          prev.map((c) =>
            c.image === first.image ? { ...c, matched: true } : c
          )
        );
        setFlippedCards([]);
        setScore((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards]);

  // 🏁 Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setGameOver(true);
      setMessage("🎉 You Win!");
    }
  }, [cards]);

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h2 className="mb-2 text-capitalize">{difficulty} Mode</h2>
      <h5 className="mb-1">Score: {score}</h5>
      <h6 className="text-warning mb-4">Time Left: {timeLeft}s</h6>

      {!gameOver ? (
        <div
          className="d-grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h3>{message}</h3>
        </div>
      )}

      <button className="btn btn-light mt-5 px-4 py-2" onClick={onRestart}>
        🔙 Back to Menu
      </button>
    </div>
  );
}

