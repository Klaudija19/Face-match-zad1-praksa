import React from 'react'

export default function Card({ card, onFlip }) {
  return (
    <div className="flip-card" onClick={onFlip}>
      <div className={`flip-card-inner ${card.flipped || card.matched ? 'flipped' : ''}`}>
        <div className="flip-card-front"></div>
        <div className="flip-card-back" style={{ background: card.color }}>
          <div style={{ fontSize: '2.4rem' }}>{card.label}</div>
        </div>
      </div>
    </div>
  )
}
