import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Board({ cards, setCards, running, setRunning }) {
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [lock, setLock] = useState(false)

  useEffect(() => {
    if (first && second) {
      setLock(true)
      if (first.id === second.id) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.id === first.id ? { ...c, matched: true } : c))
          )
          resetChoice()
        }, 600)
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.uuid === first.uuid || c.uuid === second.uuid
                ? { ...c, flipped: false }
                : c
            )
          )
          resetChoice()
        }, 800)
      }
    }
  }, [first, second])

  useEffect(() => {
    if (cards.length && cards.every(c => c.matched)) {
      setRunning(false)
      alert('You won!')
    }
  }, [cards])

  function resetChoice() {
    setFirst(null)
    setSecond(null)
    setLock(false)
  }

  function handleFlip(card) {
    if (!running || lock || card.flipped || card.matched) return
    setCards(prev =>
      prev.map(c => (c.uuid === card.uuid ? { ...c, flipped: true } : c))
    )
    if (!first) setFirst(card)
    else if (!second && card.uuid !== first.uuid) setSecond(card)
  }

  const cols = cards.length <= 6 ? 3 : cards.length <= 12 ? 4 : 6

  return (
    <div
      className="d-grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {cards.map(card => (
        <Card key={card.uuid} card={card} onFlip={() => handleFlip(card)} />
      ))}
    </div>
  )
}
