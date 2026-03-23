// src/App.jsx
import { useState } from 'react'
import StartScreen  from './components/StartScreen'
import SwipeScreen  from './components/SwipeScreen'
import ResultScreen from './components/ResultScreen'

function App() {
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
      {screen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {screen === 'swipe' && (
        <SwipeScreen onComplete={handleSwipeComplete} />
      )}
      {screen === 'result' && (
        <ResultScreen vibeScores={vibeScores} onRestart={handleRestart} />
      )}
    </>
  )
}

export default App
