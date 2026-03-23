// src/App.jsx
// Central state container. Controls which screen is visible.
// Screens: 'start' | 'swipe' | 'result'

import { useState } from 'react'
import StartScreen from './components/StartScreen'

// SwipeScreen and ResultScreen imported in Phase 4 and 5
// import SwipeScreen from './components/SwipeScreen'
// import ResultScreen from './components/ResultScreen'

function App() {
  const [screen, setScreen] = useState('start')

  const handleStart = () => setScreen('swipe')

  return (
    <>
      {screen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {/* Swipe and Result screens added in Phase 4 & 5 */}
      {screen === 'swipe' && (
        <div className="screen" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Swipe screen coming in Phase 4...
        </div>
      )}
    </>
  )
}

export default App
