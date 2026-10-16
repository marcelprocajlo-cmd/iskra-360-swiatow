export type MusicTheme = 'menu' | 'clockwork' | 'combat';
export type MusicLayer = 'pad' | 'bass' | 'arp' | 'drum';
export interface BeatEvent { at: number; step: number; midi: number; layer: MusicLayer; }
interface ThemeConfig { bpm: number; root: number; scale: readonly number[]; }
const THEMES: Record<MusicTheme, ThemeConfig> = {
  menu: { bpm: 72, root: 48, scale: [0, 3, 7, 10, 14] },
  clockwork: { bpm: 88, root: 45, scale: [0, 3, 5, 7, 10] },
  combat: { bpm: 112, root: 43, scale: [0, 3, 5, 6, 10] },
};
/** Audio-time clock. Rendering frame rate never determines note placement. */
export class BeatClock {
  private theme: ThemeConfig = THEMES.menu;
  private nextTime = 0;
  private stepIndex = 0;
  private running = false;
  private offsetSeconds = 0;
  readonly lookaheadSeconds = 0.12;
  start(audioTime: number, theme: MusicTheme = 'menu'): void { this.theme = THEMES[theme]; this.nextTime = audioTime + 0.04; this.stepIndex = 0; this.running = true; }
  pause(): void { this.running = false; }
  resume(audioTime: number): void { this.nextTime = audioTime + 0.04; this.running = true; }
  setCalibration(milliseconds: number): void { this.offsetSeconds = Math.max(-0.25, Math.min(0.25, milliseconds / 1000)); }
  setTempo(bpm: number): void { this.theme = { ...this.theme, bpm: Math.max(55, Math.min(150, bpm)) }; }
  advance(audioTime: number): BeatEvent[] {
    if (!this.running) return [];
    const events: BeatEvent[] = [];
    const stepDuration = 60 / this.theme.bpm / 2;
    while (this.nextTime < audioTime + this.lookaheadSeconds && events.length < 16) {
      const step = this.stepIndex;
      const at = Math.max(audioTime, Math.min(audioTime + this.lookaheadSeconds, this.nextTime + this.offsetSeconds));
      const scale = this.theme.scale;
      events.push({ at, step, midi: this.theme.root + scale[(step * 3 + Math.floor(step / 8)) % scale.length]!, layer: 'arp' });
      if (step % 4 === 0) events.push({ at, step, midi: this.theme.root - 12, layer: 'bass' });
      if (step % 8 === 0) events.push({ at, step, midi: this.theme.root + 12, layer: 'pad' });
      if (step % 4 === 2) events.push({ at: Math.max(audioTime, this.nextTime + this.offsetSeconds), step, midi: 36, layer: 'drum' });
      this.stepIndex += 1; this.nextTime += stepDuration;
    }
    return events;
  }
}
