// src/services/trackService.js
// Data access layer. All components must use these functions.
// Swap these implementations to connect a real backend — components won't need to change.

import { tracks } from '../data/tracks.js';

/**
 * Returns all tracks in a shuffled order.
 * Shuffle ensures a fresh experience on each session.
 * @returns {Array} Shuffled array of track objects
 */
export function getAllTracks() {
  return [...tracks].sort(() => Math.random() - 0.5);
}

/**
 * Returns tracks for the swipe session (first N tracks after shuffle).
 * @param {number} count - How many tracks to include in session
 * @returns {Array}
 */
export function getSessionTracks(count = 8) {
  return getAllTracks().slice(0, count);
}

/**
 * Given a vibe string, returns the best matching track for recommendation.
 * Priority: picks the track with the most "iconic" feel (lowest BPM for
 * melancholic/chill, highest BPM for aggressive/party).
 * @param {string} vibe - One of: "melancholic", "chill", "aggressive", "party"
 * @returns {Object|null} Track object or null if not found
 */
export function getRecommendationByVibe(vibe) {
  const vibeTracksPool = tracks.filter((t) => t.vibe === vibe);
  if (!vibeTracksPool.length) return null;

  const lowEnergyVibes = ['melancholic', 'chill'];
  const sorted = [...vibeTracksPool].sort((a, b) =>
    lowEnergyVibes.includes(vibe) ? a.bpm - b.bpm : b.bpm - a.bpm
  );
  return sorted[0];
}

/**
 * Returns all unique vibe tags present in the database.
 * Useful for building dynamic UI or vibe filters.
 * @returns {string[]}
 */
export function getAllVibes() {
  return [...new Set(tracks.map((t) => t.vibe))];
}
