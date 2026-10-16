export type BossPhase = 'awakening' | 'hunt' | 'enraged';

/** Boss phases are deterministic and based only on remaining health. */
export function getBossPhase(hp: number, maxHp: number): BossPhase {
  if (!Number.isFinite(hp) || !Number.isFinite(maxHp) || maxHp <= 0) {
    throw new RangeError('Boss health must be finite and maxHp must be positive');
  }
  const ratio = Math.max(0, Math.min(1, hp / maxHp));
  if (ratio > 2 / 3) return 'awakening';
  if (ratio > 1 / 3) return 'hunt';
  return 'enraged';
}
