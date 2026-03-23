// src/__tests__/trackService.test.js
import { describe, it, expect } from 'vitest';
import { getAllTracks, getSessionTracks, getRecommendationByVibe, getAllVibes } from '../services/trackService';

describe('trackService', () => {
  it('getAllTracks() returns an array of 8+ tracks', () => {
    const tracks = getAllTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThanOrEqual(8);
  });

  it('getSessionTracks(5) returns exactly 5 tracks', () => {
    const tracks = getSessionTracks(5);
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBe(5);
  });

  it("getRecommendationByVibe('aggressive') returns a track with vibe === 'aggressive'", () => {
    const track = getRecommendationByVibe('aggressive');
    expect(track).toBeDefined();
    expect(track.vibe).toBe('aggressive');
  });

  it("getRecommendationByVibe('chill') returns a track with vibe === 'chill'", () => {
    const track = getRecommendationByVibe('chill');
    expect(track).toBeDefined();
    expect(track.vibe).toBe('chill');
  });

  it('getAllVibes() returns an array containing all 4 vibes', () => {
    const vibes = getAllVibes();
    expect(Array.isArray(vibes)).toBe(true);
    expect(vibes).toContain('aggressive');
    expect(vibes).toContain('chill');
    expect(vibes).toContain('party');
    expect(vibes).toContain('melancholic');
  });
});
