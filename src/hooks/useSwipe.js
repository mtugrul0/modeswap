// src/hooks/useSwipe.js
// Handles mouse and touch drag for swipe cards.
// Returns drag state and event handlers to attach to the card element.

import { useState, useRef, useCallback } from 'react'

const SWIPE_THRESHOLD = 80 // px — minimum drag to trigger a swipe

/**
 * useSwipe — drag-to-swipe hook
 *
 * @param {Function} onSwipeLeft  — called when user swipes left (pass)
 * @param {Function} onSwipeRight — called when user swipes right (like)
 * @returns {{ dragOffset, isDragging, rotation, dragHandlers }}
 */
export function useSwipe({ onSwipeLeft, onSwipeRight }) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(null)
  const isDraggingRef = useRef(false)
  const hasSwiped = useRef(false)

  // Clamp rotation: max 20deg either direction
  const rotation = Math.max(-20, Math.min(20, dragOffset * 0.12))

  const handleDragStart = useCallback((clientX) => {
    startX.current = clientX
    isDraggingRef.current = true
    hasSwiped.current = false
    setIsDragging(true)
  }, [])

  const handleDragMove = useCallback((clientX) => {
    if (!isDraggingRef.current || startX.current === null) return
    const delta = clientX - startX.current
    setDragOffset(delta)
  }, [])

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current || hasSwiped.current) return
    isDraggingRef.current = false
    hasSwiped.current = true
    setIsDragging(false)

    if (dragOffset > SWIPE_THRESHOLD) {
      onSwipeRight()
    } else if (dragOffset < -SWIPE_THRESHOLD) {
      onSwipeLeft()
    }

    // Reset position
    startX.current = null
    setDragOffset(0)
  }, [dragOffset, onSwipeLeft, onSwipeRight])

  const dragHandlers = {
    // Mouse events
    onMouseDown: (e) => { e.preventDefault(); handleDragStart(e.clientX) },
    onMouseMove: (e) => { if (isDraggingRef.current) handleDragMove(e.clientX) },
    onMouseUp:   () => handleDragEnd(),
    onMouseLeave: () => { if (isDraggingRef.current) handleDragEnd() },

    // Touch events
    onTouchStart: (e) => handleDragStart(e.touches[0].clientX),
    onTouchMove:  (e) => { e.preventDefault(); handleDragMove(e.touches[0].clientX) },
    onTouchEnd:   () => handleDragEnd(),
  }

  return { dragOffset, isDragging, rotation, dragHandlers }
}
