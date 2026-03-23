// src/components/ResultScreen.jsx
import { useState, useEffect } from 'react'
import { getRecommendationByVibe } from '../services/trackService'
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
  const [tiedVibes,    setTiedVibes]    = useState([])
  const [phase,        setPhase]        = useState('calculating') // 'calculating' | 'tie' | 'result'

  useEffect(() => {
    // Small delay for dramatic effect
    const timer = setTimeout(() => {
      const result = calculateWinner(vibeScores)

      if (result.tie) {
        setTiedVibes(result.vibes)
        setPhase('tie')
      } else {
        setResolvedVibe(result.vibe)
        setPhase('result')
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [vibeScores])

  const handleTieBreak = (chosenVibe) => {
    setResolvedVibe(chosenVibe)
    setPhase('result')
  }

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

  // --- Tie-breaking screen ---
  if (phase === 'tie') {
    return (
      <div className="screen result-screen">
        <div className="result-content result-content--tie">
          <p className="result-eyebrow">It's a tie — you decide</p>
          <h2 className="result-tie-title">Two vibes matched equally.<br />Which one is more YOU?</h2>

          <div className="tie-options">
            {tiedVibes.map((vibe) => {
              const track = getRecommendationByVibe(vibe)
              return (
                <button
                  key={vibe}
                  className="tie-option-btn"
                  data-vibe={vibe}
                  onClick={() => handleTieBreak(vibe)}
                >
                  <span className="vibe-badge" data-vibe={vibe}>{vibe}</span>
                  {track && (
                    <span className="tie-track-hint">
                      e.g. {track.title} — {track.artist}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
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

  return (
    <div className="screen result-screen">
      <div className="result-content" style={{ '--result-vibe-color': `var(--color-vibe-${resolvedVibe})` }}>

        {/* Ambient glow */}
        <div className="result-glow" aria-hidden="true" />

        {/* Eyebrow */}
        <p className="result-eyebrow">Your Mode is</p>

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

        {/* Score breakdown */}
        <div className="result-scores">
          {Object.entries(vibeScores).map(([vibe, score]) => (
            <div key={vibe} className="score-row">
              <span className="score-vibe" data-vibe={vibe}>{vibe}</span>
              <div className="score-bar-track">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${(score / 5) * 100}%`,
                    background: `var(--color-vibe-${vibe})`
                  }}
                />
              </div>
              <span className="score-num">{score}</span>
            </div>
          ))}
        </div>

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

/* --- Vibe calculation logic --- */
function calculateWinner(vibeScores) {
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

export default ResultScreen
