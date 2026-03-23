// src/components/ResultScreen.jsx
import { useState, useEffect } from 'react'
import { getRecommendationByVibe } from '../services/trackService'
import { calculateWinner } from '../utils/calculateWinner'
import '../styles/result.css'

/**
 * ResultScreen — shows the user's dominant vibe and a track recommendation.
 *
 * Props:
 *   vibeScores: Object  — e.g. { aggressive: 2, chill: 1, party: 2 }
 *   onRestart:  () => void — resets the app back to start screen
 */
function ResultScreen({ vibeScores, onRestart }) {
  const [resolvedVibe, setResolvedVibe] = useState(null)
  const [phase,        setPhase]        = useState('calculating') // 'calculating' | 'result'

  useEffect(() => {
    // Small delay for dramatic effect
    const timer = setTimeout(() => {
      const result = calculateWinner(vibeScores)

      if (result.tie) {
        // Should no longer happen due to automatic tiebreakers, but fallback
        setResolvedVibe(result.vibes[0])
        setPhase('result')
      } else {
        setResolvedVibe(result.vibe)
        setPhase('result')
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [vibeScores])

  // --- Calculating / loading state ---
  if (phase === 'calculating') {
    return (
      <div className="screen result-screen">
        <div className="result-calculating">
          <div className="result-spinner" aria-label="Calculating your vibe..." />
          <p>Analyzing your taste...</p>
        </div>
      </div>
    )
  }



  // --- Final result screen ---
  const recommendation = getRecommendationByVibe(resolvedVibe)
  const vibeEmoji = {
    aggressive: '🔥',
    party:      '⚡',
    chill:      '🌊',
    melancholic:'🌙',
  }[resolvedVibe] || '🎵'

  const scoreValues = Object.values(vibeScores);
  const totalScore = scoreValues.reduce((sum, val) => sum + val, 0);
  const isHardToPlease = scoreValues.length === 1 && totalScore === 1;

  return (
    <div className="screen result-screen">
      <div className="result-content" style={{ '--result-vibe-color': `var(--color-vibe-${resolvedVibe})` }}>

        {/* Ambient glow */}
        <div className="result-glow" aria-hidden="true" />

        {/* Eyebrow */}
        <p className="result-eyebrow">
          {isHardToPlease ? "You're hard to please. Here's our pick anyway." : "You should be listening to"}
        </p>

        {/* Big vibe reveal */}
        <div className="result-vibe-reveal">
          <span className="result-emoji" aria-hidden="true">{vibeEmoji}</span>
          <h1 className="result-vibe-name">{resolvedVibe.toUpperCase()}</h1>
        </div>

        {/* Vibe description */}
        <p className="result-description">
          {vibeDescriptions[resolvedVibe] || 'Your taste is unique.'}
        </p>

        {/* Track recommendation */}
        {recommendation && (
          <div className="result-recommendation">
            <p className="result-rec-label">We recommend</p>
            <div className="result-track-card">
              <img
                src={recommendation.coverUrl}
                alt={`${recommendation.title} cover`}
                className="result-track-cover"
                loading="lazy"
              />
              <div className="result-track-info">
                <p className="result-track-title">{recommendation.title}</p>
                <p className="result-track-artist">{recommendation.artist}</p>
                <span className="vibe-badge" data-vibe={recommendation.vibe}>
                  {recommendation.vibe}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Restart button */}
        <button className="result-restart-btn" onClick={onRestart}>
          Swipe Again
        </button>

      </div>
    </div>
  )
}

/* --- Vibe descriptions --- */
const vibeDescriptions = {
  aggressive: 'You run on raw energy. Pressure makes you stronger. No filters, no apologies.',
  party:      'You live for the peak moment. First on the floor, last to leave. Pure electricity.',
  chill:      'You move at your own pace. Cool under pressure. The realest in the room.',
  melancholic:'You feel deeply, create deeply. Beauty lives in the shadows you see.',
}

export default ResultScreen

