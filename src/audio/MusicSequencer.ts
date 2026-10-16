import { BeatClock, type BeatEvent, type MusicTheme } from './BeatClock';

const midiHz = (midi: number): number => 440 * 2 ** ((midi - 69) / 12);

/** Schedules soft synthesized layers against AudioContext.currentTime. */
export class MusicSequencer {
  private readonly clock = new BeatClock();
  private intensity = 0.18;
  constructor(private readonly context: AudioContext, private readonly output: GainNode) {}
  start(theme: MusicTheme): void { this.clock.start(this.context.currentTime, theme); }
  stop(): void { this.clock.pause(); }
  setCalibration(milliseconds: number): void { this.clock.setCalibration(milliseconds); }
  update(intensity = this.intensity): void {
    if (this.context.state !== 'running') return;
    this.intensity = Math.max(0, Math.min(1, intensity));
    for (const event of this.clock.advance(this.context.currentTime)) this.schedule(event);
  }
  private schedule(event: BeatEvent): void {
    const now = this.context.currentTime;
    const at = Math.max(now + 0.003, event.at);
    const duration = event.layer === 'pad' ? 0.58 : event.layer === 'bass' ? 0.24 : event.layer === 'drum' ? 0.075 : 0.13;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    oscillator.type = event.layer === 'pad' ? 'sine' : event.layer === 'bass' ? 'triangle' : event.layer === 'drum' ? 'sine' : 'triangle';
    oscillator.frequency.setValueAtTime(event.layer === 'drum' ? 68 : midiHz(event.midi), at);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(event.layer === 'pad' ? 700 : event.layer === 'bass' ? 420 : 2100, at);
    const layerGain = event.layer === 'pad' ? 0.012 : event.layer === 'bass' ? 0.028 : event.layer === 'drum' ? 0.012 : 0.014;
    const volume = layerGain * (0.35 + this.intensity * 0.65);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.linearRampToValueAtTime(volume, at + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    oscillator.connect(filter); filter.connect(gain); gain.connect(this.output);
    oscillator.start(at); oscillator.stop(at + duration + 0.02);
  }
}
