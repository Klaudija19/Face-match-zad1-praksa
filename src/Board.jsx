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

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flippedCards, card];
    setCards(newCards);
    setFlippedCards(newFlipped);
  };

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
        }, 1000);
      }
    }
  }, [flippedCards]);

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h2 className="mb-3 text-capitalize">{difficulty} Mode</h2>
      <h5 className="mb-4">Score: {score}</h5>

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

      <button className="btn btn-light mt-5 px-4 py-2" onClick={onRestart}>
        🔙 Back to Menu
      </button>
    </div>
  );
}
