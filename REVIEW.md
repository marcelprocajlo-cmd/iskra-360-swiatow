# REVIEW — legacy and Phaser rewrite

## Legacy version

The reference implementation remains in `legacy/index.html` and `legacy/engine-3d.js`. Legacy regressions are covered by `node tests/regression.js`; these Node/VM tests do not prove renderer correctness or real-device behavior.

Known legacy gaps are not considered fixed by the rewrite: repeat-level crystal farming, incomplete key/heart mechanics, incomplete protection against all hazards, and unverified reachability of all 360 generated levels.

## Phaser rewrite — verified scope

The branch `feat/phaser-rewrite` contains a playable vertical slice built with Phaser 3, Vite and strict TypeScript. Automated checks cover build, Vitest, legacy regression tests, ESLint, level structure validation and Playwright Chromium smoke for menu, gameplay, world-map navigation and a mobile-sized viewport. The `iskra-visual-smoke` workflow artifact contains screenshots; these still need human art-direction and real-device review.

Implemented:
- 20 level definitions across four worlds, world map, level unlocks, campaign finale, versioned save migration and storage fallbacks.
- Fixed-step player simulation, keyboard/gamepad/touch input, procedural parallax art and animated flame tail.
- Combo/charge/throw combat, three patrol archetypes, enemy HP, friend rescue and crystal rewards, timed power-ups, shield interaction and game-over/retry.
- Boss encounters on each world's fifth level. Bosses have 12 HP, deterministic awakening/hunt/enraged phases, phase-dependent movement speed, a larger crystal reward, telegraphed aimed projectiles and faster firing in later phases.
- Enemy contact damage varies by archetype; boss and sentinel contact hits are stronger than standard patrol hits.
- The exit is gated while living enemies remain; the HUD shows the remaining count and level completion requires clearing the arena.
- Iskra is drawn as a small armored robot with helmet, visor, cyan sensors, a layered glowing core and energy exhaust. Combat attacks use clearer slash arcs, a bright core stroke and stronger charged/finisher shockwaves.
- PL/EN localization, settings, synthesized SFX, separate volume buses and an AudioContext-time music sequencer.

## Remaining before production

- Player motion is still a responsive platformer simulation, not a physically simulated articulated robot. Realistic mass, torque, joint response and impact-driven recovery remain future work; changes must preserve responsive controls.
- Boss attacks currently consist of aimed projectiles with telegraphs and phase-dependent cadence. World-specific boss mechanics and additional attack patterns are not implemented.
- The campaign reuses five base layout patterns with biome variations. The 20 levels are not yet 20 bespoke layouts.
- Level validation checks structure, spawn and exit placement, not full reachability through jump, glide and dash.
- Enemy behavior is not yet biome-specific. The full hazard set, cosmetic shop, achievements, daily challenge, infinite mode, full rhythm auto-run and deterministic ghost replay remain incomplete.
- No measured FPS/performance report or public preview deployment exists.
- Automated screenshots verify that scenes render, but do not replace manual combat playtesting, art-direction review, or keyboard/gamepad/touch checks on real devices.

Do not merge to `main` until the owner reviews gameplay and visual quality and explicitly approves.

Run locally with Node.js 22.12+: `npm install && npm run dev`.

## Visual review — 2026-10-17

The latest CI screenshots show a coherent dark/cyan palette, layered platform materials, rounded safe-ground inlays, better inset world-map tiles, and a readable control hint. The title screen mascot is visible and thematically matches the flame/core motif, but currently reads more as a flame character than an armored robot. The in-game robot is recognizably armored but small at the current screenshot scale; confirm its silhouette and attack readability in live combat. These are review observations, not a final art-direction sign-off.

## Combat and progression review — 2026-10-17

The latest quality workflow passed build, unit tests, lint, level validation and Playwright Chromium smoke on commit `eab7755732385fe712a6c6568fe63835e33bd77e`. This verifies automated checks only. It does not prove boss balance, projectile fairness, every level's clear-all gate, or real-device performance; those still need focused playtesting.
