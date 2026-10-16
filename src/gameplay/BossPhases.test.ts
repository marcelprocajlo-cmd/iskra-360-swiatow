import { describe, expect, it } from 'vitest';
import { getBossPhase } from './BossPhases';

describe('getBossPhase', () => {
  it('starts calm and changes phase at health thresholds', () => {
    expect(getBossPhase(12, 12)).toBe('awakening');
    expect(getBossPhase(8, 12)).toBe('awakening');
    expect(getBossPhase(7, 12)).toBe('hunt');
    expect(getBossPhase(4, 12)).toBe('enraged');
    expect(getBossPhase(0, 12)).toBe('enraged');
  });

  it('clamps out-of-range health without producing invalid phases', () => {
    expect(getBossPhase(20, 12)).toBe('awakening');
    expect(getBossPhase(-2, 12)).toBe('enraged');
  });

  it('rejects invalid maximum health', () => {
    expect(() => getBossPhase(1, 0)).toThrow(RangeError);
    expect(() => getBossPhase(Number.NaN, 10)).toThrow(RangeError);
  });
});
