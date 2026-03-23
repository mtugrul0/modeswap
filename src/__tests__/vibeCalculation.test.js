// src/__tests__/vibeCalculation.test.js
import { describe, it, expect } from 'vitest';
import { calculateWinner } from '../utils/calculateWinner';

describe('vibeCalculation', () => {
  it("Single winner: { aggressive: 3, chill: 1 } -> returns { vibe: 'aggressive', tie: false }", () => {
    const result = calculateWinner({ aggressive: 3, chill: 1 });
    expect(result).toEqual({ vibe: 'aggressive', tie: false });
  });

  it("Tie: { aggressive: 2, party: 2 } -> returns { tie: true, vibes: ['aggressive', 'party'] }", () => {
    const result = calculateWinner({ aggressive: 2, party: 2 });
    expect(result).toEqual({ tie: true, vibes: ['aggressive', 'party'] });
  });

  it("Empty scores: {} -> returns a valid fallback (any vibe, not null/undefined)", () => {
    const result = calculateWinner({});
    expect(result).toHaveProperty('vibe');
    expect(result.vibe).toBeTruthy();
    expect(result.tie).toBe(false);
  });

  it("All same score: { aggressive: 1, chill: 1, party: 1, melancholic: 1 } -> returns { tie: true }", () => {
    const result = calculateWinner({ aggressive: 1, chill: 1, party: 1, melancholic: 1 });
    expect(result).toHaveProperty('tie', true);
    expect(result).toHaveProperty('vibes');
    expect(result.vibes.length).toBe(4);
  });

  it("Single vibe only: { melancholic: 5 } -> returns { vibe: 'melancholic', tie: false }", () => {
    const result = calculateWinner({ melancholic: 5 });
    expect(result).toEqual({ vibe: 'melancholic', tie: false });
  });
});
