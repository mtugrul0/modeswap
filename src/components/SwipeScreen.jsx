// src/components/SwipeScreen.jsx
import { useState, useRef, useEffect } from 'react'
import { getSessionTracks } from '../services/trackService'
import { useSwipe } from '../hooks/useSwipe'
import '../styles/swipe.css'

const TOTAL_SWIPES = 5

/**
 * SwipeScreen — core swipe mechanic
 * Props:
 *   onComplete: (vibeScores: Object) => void
 *               Called after TOTAL_SWIPES swipes with the accumulated vibe scores.
 */
function SwipeScreen({ onComplete }) {
  const [tracks]        = useState(() => getSessionTracks(TOTAL_SWIPES + 3))
  const [currentIndex,  setCurrentIndex]  = useState(0)
  const [vibeScores,    setVibeScores]     = useState({})
  const [swipeCount,    setSwipeCount]     = useState(0)
  const [exitDirection, setExitDirection]  = useState(null) // 'left' | 'right' | null
  const [isAnimating,   setIsAnimating]    = useState(false)
  const audioRef = useRef(null)

  const currentTrack = tracks[currentIndex]

  // Pause audio when card changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [currentIndex])

  const triggerSwipe = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)
    setExitDirection(direction)

    // Score the like
    if (direction === 'right') {
      setVibeScores(prev => ({
        ...prev,
        [currentTrack.vibe]: (prev[currentTrack.vibe] || 0) + 1
      }))
    }

    // After animation, advance card
    setTimeout(() => {
      const newCount = swipeCount + 1
      setSwipeCount(newCount)
      setCurrentIndex(i => i + 1)
      setExitDirection(null)
      setIsAnimating(false)

      if (newCount >= TOTAL_SWIPES) {
        // Pass updated scores to parent
        const finalScores = direction === 'right'
          ? { ...vibeScores, [currentTrack.vibe]: (vibeScores[currentTrack.vibe] || 0) + 1 }
          : { ...vibeScores }
        onComplete(finalScores)
      }
    }, 400)
  }

  const { dragOffset, isDragging, rotation, dragHandlers } = useSwipe({
    onSwipeLeft:  () => triggerSwipe('left'),
    onSwipeRight: () => triggerSwipe('right'),
  })

  // Derive like/pass overlay opacity from drag
  const likeOpacity  = Math.max(0, Math.min(1, dragOffset / 80))
  const passOpacity  = Math.max(0, Math.min(1, -dragOffset / 80))

  if (!currentTrack) return null

  // Card transform: drag offset + rotation, or exit animation
  const cardStyle = exitDirection
    ? {} // CSS class handles exit animation
    : {
        transform: isDragging
          ? `translateX(${dragOffset}px) rotate(${rotation}deg)`
          : 'translateX(0) rotate(0)',
        transition: isDragging ? 'none' : 'transform 0.3s var(--transition-slow)',
      }

  return (
    <div className="screen swipe-screen">
      {/* Progress bar */}
      <div className="swipe-progress" aria-label={`${swipeCount} of ${TOTAL_SWIPES} swipes`}>
        {Array.from({ length: TOTAL_SWIPES }).map((_, i) => (
          <div
            key={i}
            className={`swipe-progress-dot ${i < swipeCount ? 'done' : ''} ${i === swipeCount ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Card stack */}
      <div className="card-stack">
        {/* Next card visible behind (peek effect) */}
        {tracks[currentIndex + 1] && (
          <div className="music-card music-card--next" aria-hidden="true">
            <img
              src={tracks[currentIndex + 1].coverUrl}
              alt=""
              className="card-cover"
            />
          </div>
        )}

        {/* Current swipeable card */}
        <div
          className={`music-card music-card--active ${exitDirection ? `exit-${exitDirection}` : ''}`}
          style={cardStyle}
          {...dragHandlers}
          role="article"
          aria-label={`${currentTrack.title} by ${currentTrack.artist}`}
        >
          {/* Like overlay */}
          <div className="card-overlay card-overlay--like" style={{ opacity: likeOpacity }} aria-hidden="true">
            <span>LIKE</span>
          </div>
          {/* Pass overlay */}
          <div className="card-overlay card-overlay--pass" style={{ opacity: passOpacity }} aria-hidden="true">
            <span>PASS</span>
          </div>

          {/* Cover image */}
          <img
            src={currentTrack.coverUrl}
            alt={`${currentTrack.title} cover art`}
            className="card-cover"
            draggable="false"
          />

          {/* Card info */}
          <div className="card-info">
            <span className="vibe-badge" data-vibe={currentTrack.vibe}>
              {currentTrack.vibe}
            </span>
            <h2 className="card-title">{currentTrack.title}</h2>
            <p className="card-artist">{currentTrack.artist}</p>
            <p className="card-album">{currentTrack.album} · {currentTrack.year}</p>

            {/* Audio preview */}
            <div className="card-audio">
              <audio
                ref={audioRef}
                src={currentTrack.audioPreviewUrl}
                preload="none"
              />
              <button
                className="audio-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  if (audioRef.current.paused) {
                    audioRef.current.play()
                  } else {
                    audioRef.current.pause()
                  }
                }}
                aria-label="Toggle audio preview"
              >
                ▶ Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons (fallback for non-touch devices) */}
      <div className="swipe-actions">
        <button
          className="action-btn action-btn--pass"
          onClick={() => triggerSwipe('left')}
          disabled={isAnimating}
          aria-label="Pass this track"
        >
          ✕
        </button>
        <button
          className="action-btn action-btn--like"
          onClick={() => triggerSwipe('right')}
          disabled={isAnimating}
          aria-label="Like this track"
        >
          ♥
        </button>
      </div>

      <p className="swipe-hint">Swipe right to like · left to pass</p>
    </div>
  )
}

export default SwipeScreen
