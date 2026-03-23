// src/components/StartScreen.jsx
import '../styles/start.css'

/**
 * StartScreen — first screen users see.
 * Props:
 *   onStart: () => void — called when user taps "Start Swiping"
 */
function StartScreen({ onStart }) {
  return (
    <div className="screen start-screen">
      {/* Background decorative element */}
      <div className="start-bg-orb" aria-hidden="true" />

      <div className="start-content">
        {/* Eyebrow label */}
        <p className="start-eyebrow">Rock &amp; Metal Discovery</p>

        {/* Hero title */}
        <h1 className="start-title">
          MODE<br />
          <span className="start-title-accent">SWAP</span>
        </h1>

        {/* Description */}
        <p className="start-description">
          Swipe through tracks. Find your vibe.<br />
          Iconic rock and metal, curated for you.
        </p>

        {/* Vibe tags preview */}
        <div className="start-vibes">
          <span className="vibe-badge" data-vibe="aggressive">Aggressive</span>
          <span className="vibe-badge" data-vibe="chill">Chill</span>
          <span className="vibe-badge" data-vibe="party">Party</span>
          <span className="vibe-badge" data-vibe="melancholic">Melancholic</span>
        </div>

        {/* CTA Button */}
        <button
          className="start-btn"
          onClick={onStart}
          aria-label="Start swiping through tracks"
        >
          Start Swiping
          <span className="start-btn-arrow" aria-hidden="true">→</span>
        </button>

        {/* Footer hint */}
        <p className="start-hint">5 swipes · discover your mode</p>
      </div>
    </div>
  )
}

export default StartScreen
