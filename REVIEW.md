# REVIEW — legacy and Phaser rewrite

## Legacy version

The reference implementation remains in `legacy/index.html` and `legacy/engine-3d.js`. Legacy regressions are covered by `node tests/regression.js`; these Node/VM tests do not prove renderer correctness or real-device behavior.

Known legacy gaps are not considered fixed by the rewrite: repeat-level crystal farming, incomplete key/heart mechanics, incomplete protection against all hazards, and unverified reachability of all 360 generated levels.

## Phaser rewrite — verified scope

The branch `feat/phaser-rewrite` contains a playable vertical slice built with Phaser 3, Vite and strict TypeScript. Automated checks cover build, Vitest, legacy regression tests, ESLint, level structure validation and Playwright Chromium smoke for menu, gameplay, world-map navigation and a mobile-sized viewport. The `iskra-visual-smoke` workflow artifact contains screenshots; these still need human review.

Implemented:
- 20 level definitions across four worlds, world map, level unlocks, campaign finale, versioned save migration and storage fallbacks.
- Fixed-step player simulation, keyboard/gamepad/touch input, procedural parallax art and animated flame tail.
- Combo/charge/throw combat, three patrol archetypes, enemy HP, friend rescue and crystal rewards, timed power-ups, shield interaction and game-over/retry.
- Boss encounters on each world's fifth level. Bosses have 12 HP, deterministic awakening/hunt/enraged phases, phase-dependent movement speed and a larger crystal reward.
- PL/EN localization, settings, synthesized SFX, separate volume buses and an AudioContext-time music sequencer.

## Remaining before production

- Boss phases currently change movement speed and visual scale; bespoke boss attacks, telegraphs and world-specific boss mechanics are not implemented.
- The campaign reuses five base layout patterns with biome variations. The 20 levels are not yet 20 bespoke layouts.
- Level validation checks structure, spawn and exit placement, not full reachability through jump, glide and dash.
- Enemy behavior is not yet biome-specific. The full hazard set, cosmetic shop, achievements, daily challenge, infinite mode, full rhythm auto-run and deterministic ghost replay remain incomplete.
- No measured FPS/performance report or public preview deployment exists.
- Screenshots have not received human art-direction review, and keyboard/gamepad/touch feel has not been reviewed on real devices.

Do not merge to `main` until the owner reviews gameplay and visual quality and explicitly approves.

Run locally with Node.js 22.12+: `npm install && npm run dev`.


## Visual review — 2026-10-17

Reviewed the CI screenshots for the menu, first level and world map. The menu palette is coherent, but the large star looks like a placeholder. Platform-top triangles read as spikes even on safe ground, so they have been replaced with short rounded inlays. Level tiles on the world map were too close to the card edge and have been moved inward. The updated screenshots still need a fresh browser review after CI completes; this is not yet a full art-direction or real-device review.
