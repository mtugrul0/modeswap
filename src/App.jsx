// src/App.jsx
import { useState } from 'react'
import StartScreen  from './components/StartScreen'
import SwipeScreen  from './components/SwipeScreen'

function App() {
  const [screen,     setScreen]     = useState('start')
  const [vibeScores, setVibeScores] = useState({})

  const handleStart = () => setScreen('swipe')

  const handleSwipeComplete = (scores) => {
    setVibeScores(scores)
    setScreen('result')
  }

  return (
    <>
      {screen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {screen === 'swipe' && (
        <SwipeScreen onComplete={handleSwipeComplete} />
      )}
      {screen === 'result' && (
        <div className="screen" style={{ color: 'white', fontFamily: 'var(--font-mono)', gap: '1rem' }}>
          <p>Result screen coming in Phase 5...</p>
          <pre style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>
            {JSON.stringify(vibeScores, null, 2)}
          </pre>
        </div>
      )}
    </>
  )
}

export default App
