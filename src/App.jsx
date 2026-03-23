// src/App.jsx
import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import StartScreen  from './components/StartScreen'
import SwipeScreen  from './components/SwipeScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [screen,     setScreen]     = useState('start')
  const [vibeScores, setVibeScores] = useState({})

  const handleStart = () => {
    setVibeScores({})
    setScreen('swipe')
  }

  const handleSwipeComplete = (scores) => {
    setVibeScores(scores)
    setScreen('result')
  }

  const handleRestart = () => {
    setScreen('start')
  }

  return (
    <>
      {/* Floating theme toggle — always on top */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>

      <div className="screen-wrapper" key={screen}>
        {screen === 'start' && (
          <StartScreen onStart={handleStart} />
        )}
        {screen === 'swipe' && (
          <SwipeScreen onComplete={handleSwipeComplete} />
        )}
        {screen === 'result' && (
          <ResultScreen vibeScores={vibeScores} onRestart={handleRestart} />
        )}
      </div>
    </>
  )
}

export default App
