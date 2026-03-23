// src/utils/calculateWinner.js

export function calculateWinner(vibeScores) {
  if (!vibeScores || Object.keys(vibeScores).length === 0) {
    return { vibe: 'chill', tie: false }
  }

  const maxScore = Math.max(...Object.values(vibeScores))
  const winners  = Object.entries(vibeScores)
    .filter(([, score]) => score === maxScore)
    .map(([vibe]) => vibe)

  if (winners.length === 1) {
    return { vibe: winners[0], tie: false }
  }

  // Multiple winners — it's a tie
  return { vibes: winners, tie: true }
}
