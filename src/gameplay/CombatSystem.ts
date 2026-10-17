export type AttackKind = 'light' | 'finisher' | 'charged' | 'air' | 'throw';

export interface CombatState {
  comboStep: number;
  comboWindow: number;
  chargeSeconds: number;
  attackCooldown: number;
  inputBuffer: number;
  attackingFor: number;
}

export interface CombatInput {
  attackPressed: boolean;
  attackHeld: boolean;
  attackReleased: boolean;
  throwPressed: boolean;
  grounded: boolean;
  facing: -1 | 1;
}

export interface AttackEvent {
  kind: AttackKind;
  damage: number;
  range: number;
  knockback: number;
  projectile: boolean;
}

export function createCombatState(): CombatState {
  return { comboStep: 0, comboWindow: 0, chargeSeconds: 0, attackCooldown: 0, inputBuffer: 0, attackingFor: 0 };
}

function normalAttack(state: CombatState, grounded: boolean): AttackEvent {
  if (!grounded) {
    state.attackCooldown = 0.28;
    state.attackingFor = 0.2;
    return { kind: 'air', damage: 2, range: 76, knockback: 180, projectile: false };
  }
  state.comboStep = state.comboWindow > 0 ? state.comboStep + 1 : 1;
  const finisher = state.comboStep >= 3;
  const event: AttackEvent = { kind: finisher ? 'finisher' : 'light', damage: finisher ? 4 : 1, range: finisher ? 92 : 64, knockback: finisher ? 360 : 140, projectile: false };
  state.comboStep = finisher ? 0 : state.comboStep;
  state.comboWindow = finisher ? 0 : 0.42;
  state.attackCooldown = finisher ? 0.32 : 0.16;
  state.attackingFor = finisher ? 0.3 : 0.18;
  return event;
}

/** Pure combat state machine: a three-hit chain, charged breaker, aerial slash and spark throw. */
export function stepCombat(state: CombatState, input: CombatInput, dt = 1 / 60): AttackEvent[] {
  state.attackCooldown = Math.max(0, state.attackCooldown - dt);
  state.comboWindow = Math.max(0, state.comboWindow - dt);
  state.attackingFor = Math.max(0, state.attackingFor - dt);
  state.inputBuffer = input.attackPressed ? 0.12 : Math.max(0, state.inputBuffer - dt);
  if (state.comboWindow === 0) state.comboStep = 0;

  if (input.attackHeld && (state.chargeSeconds > 0 || state.inputBuffer > 0)) {
    state.chargeSeconds = Math.min(0.9, state.chargeSeconds + dt);
  }

  if (input.throwPressed && state.attackCooldown === 0) {
    state.attackCooldown = 0.38;
    state.inputBuffer = 0;
    state.chargeSeconds = 0;
    state.attackingFor = 0.2;
    return [{ kind: 'throw', damage: 2, range: 520, knockback: 220, projectile: true }];
  }

  if (input.attackReleased && state.chargeSeconds >= 0.35 && state.attackCooldown === 0) {
    state.attackCooldown = 0.42;
    state.comboStep = 0;
    state.comboWindow = 0;
    state.inputBuffer = 0;
    state.chargeSeconds = 0;
    state.attackingFor = 0.28;
    return [{ kind: 'charged', damage: 4, range: 100, knockback: 420, projectile: false }];
  }

  if (input.attackReleased && state.chargeSeconds > 0 && state.attackCooldown === 0) {
    const event = normalAttack(state, input.grounded);
    state.inputBuffer = 0;
    state.chargeSeconds = 0;
    return [event];
  }

  if (input.attackPressed && !input.attackHeld && state.attackCooldown === 0) {
    const event = normalAttack(state, input.grounded);
    state.inputBuffer = 0;
    state.chargeSeconds = 0;
    return [event];
  }

  return [];
}
