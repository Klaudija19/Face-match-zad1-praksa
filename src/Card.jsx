import React from "react";

export default function Card({ card, onClick }) {
  return (
    <div
      className={`card-container ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={() => !card.flipped && !card.matched && onClick(card)}
      style={{
        width: "100px",
        height: "100px",
        perspective: "1000px",
      }}
    >
      <div
        className="card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: card.flipped || card.matched ? "rotateY(180deg)" : "none",
        }}
      >
        {/* Задна страна */}
        <div
          className="card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#6c757d",
            borderRadius: "10px",
            backfaceVisibility: "hidden",
          }}
        ></div>

        {/* Предна страна */}
        <div
          className="card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={card.image}
            alt="face"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
