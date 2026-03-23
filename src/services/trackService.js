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
  return tracks.filter((t) => !t.tiebreaker).sort(() => Math.random() - 0.5);
}

/**
 * Returns tracks for the swipe session (first N tracks after shuffle).
 * @param {number} count - How many tracks to include in session
 * @returns {Array}
 */
export function getSessionTracks(count = 10) {
  return getAllTracks().slice(0, count);
}

/**
 * Given a vibe string, returns the best matching track for recommendation.
 * Priority: picks the track with the most "iconic" feel (lowest BPM for
 * melancholic/chill, highest BPM for aggressive/party).
 * @param {string} vibe - One of: "aggressive", "chill", "party", "melancholic", "sad", "energetic", "dark", "euphoric", "romantic", "rebellious"
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

/**
 * Given an array of tied vibes, returns one tiebreaker track for each,
 * shuffled. Only searches among tracks designated as tiebreakers.
 * @param {string[]} tiedVibes - Array of tied vibe strings, e.g. ["chill", "party"]
 * @returns {Array} Array of tiebreaker tracks
 */
export function getTiebreakerTracks(tiedVibes) {
  const matchingTiebreakers = tracks.filter(
    (t) => t.tiebreaker && tiedVibes.includes(t.vibe)
  );

  // Group by vibe to ensure we get exactly one per tied vibe 
  const uniqueTiebreakers = [];
  const foundVibes = new Set();
  
  for (const t of matchingTiebreakers) {
    if (!foundVibes.has(t.vibe)) {
      uniqueTiebreakers.push(t);
      foundVibes.add(t.vibe);
    }
  }

  return uniqueTiebreakers.sort(() => Math.random() - 0.5);
}
