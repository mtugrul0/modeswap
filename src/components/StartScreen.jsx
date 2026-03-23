// src/components/StartScreen.jsx
import { useEffect, useRef } from 'react'
import '../styles/start.css'

/**
 * StartScreen — first screen users see.
 * Props:
 *   onStart: () => void — called when user taps "Start Swiping"
 */
function StartScreen({ onStart }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty('--mouse-x', `${x}px`)
      container.style.setProperty('--mouse-y', `${y}px`)
    }

    const handleClick = (e) => {
      if (e.target.closest('button')) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement('div')
      ripple.className = 'start-ripple'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      container.appendChild(ripple)

      ripple.addEventListener('animationend', () => ripple.remove())
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('click', handleClick)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="screen start-screen" ref={containerRef}>
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

        {/* Vibe tags marquee */}
        <div className="start-vibes-marquee">
          <div className="start-vibes-track">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="start-vibes-group">
                <span className="vibe-badge" data-vibe="aggressive">Aggressive</span>
                <span className="vibe-badge" data-vibe="chill">Chill</span>
                <span className="vibe-badge" data-vibe="party">Party</span>
                <span className="vibe-badge" data-vibe="melancholic">Melancholic</span>
              </div>
            ))}
          </div>
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
        <p className="start-hint">discover your mode</p>
      </div>
    </div>
  )
}

export default StartScreen
