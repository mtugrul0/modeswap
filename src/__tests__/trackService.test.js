// src/__tests__/trackService.test.js
import { describe, it, expect } from 'vitest';
import { getAllTracks, getSessionTracks, getRecommendationByVibe, getAllVibes } from '../services/trackService';

describe('trackService', () => {
  it('getAllTracks() returns an array of 8+ tracks', () => {
    const tracks = getAllTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThanOrEqual(8);
  });

  it('getSessionTracks(7) returns exactly 7 tracks', () => {
    const tracks = getSessionTracks(7);
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBe(7);
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

  it('getAllVibes() returns an array containing all 8 vibes', () => {
    const vibes = getAllVibes();
    expect(Array.isArray(vibes)).toBe(true);
    expect(vibes).toContain('aggressive');
    expect(vibes).toContain('chill');
    expect(vibes).toContain('party');
    expect(vibes).toContain('melancholic');
    expect(vibes).toContain('sad');
    expect(vibes).toContain('energetic');
    expect(vibes).toContain('dark');
    expect(vibes).toContain('euphoric');
    expect(vibes).toContain('romantic');
    expect(vibes).toContain('rebellious');
  });
});
