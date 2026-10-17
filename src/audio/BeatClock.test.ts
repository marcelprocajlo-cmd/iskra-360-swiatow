import { describe, expect, it } from 'vitest';
import { BeatClock } from './BeatClock';

describe('audio-time beat clock', () => {
  it('schedules notes against AudioContext time, not frame count', () => {
    const a = new BeatClock(); const b = new BeatClock(); a.start(10, 'clockwork'); b.start(10, 'clockwork');
    const at60 = Array.from({ length: 60 }, (_, i) => a.advance(10 + i / 60)).flat();
    const at144 = Array.from({ length: 144 }, (_, i) => b.advance(10 + i / 144)).flat();
    expect(at60.map((event) => [event.step, event.layer])).toEqual(at144.map((event) => [event.step, event.layer]));
    expect(at60.length).toBeGreaterThan(5);
  });
  it('pauses cleanly and resumes from a fresh audio-time anchor', () => { const clock = new BeatClock(); clock.start(2); clock.pause(); expect(clock.advance(10)).toEqual([]); clock.resume(10); expect(clock.advance(10)).not.toEqual([]); });
  it('clamps latency calibration and tempo', () => { const clock = new BeatClock(); clock.start(0); clock.setCalibration(900); clock.setTempo(999); const events = clock.advance(0); expect(events.every((event) => event.at <= .12)).toBe(true); expect(events.length).toBeLessThanOrEqual(16); });
});
