# ISKRA: 360 Światów

Oryginalna, proceduralnie renderowana platformówka o Iskrze — ostatnim żywym okruchu Pierwszego Płomienia. Nowa wersja powstaje w **Phaser 3.90.0 + Vite + TypeScript strict**. Poprzednia wersja jest zachowana w `legacy/` jako referencja zachowania.

## Wymagania
Node.js >=22.12.0. Instalacja: `npm install`, uruchomienie: `npm run dev`.

## Polecenia
- `npm run build` — ścisłe sprawdzenie typów i build do `dist/`
- `npm test` — Vitest i regresje wersji legacy
- `npm run lint` — ESLint
- `npm run validate:levels` — walidacja struktury kampanii
- `npm run preview` — podgląd buildu produkcyjnego

## Sterowanie w vertical slice
Ruch: strzałki/A-D. Skok, podwójny skok i szybowanie: W/↑/Spacja. Dash: X/Shift. Atak testowy: Z/C. Pad: lewy drążek i przyciski twarzy. Telefon/tablet: duże przyciski dotykowe z safe-area.

## Status
Plan: `docs/PLAN.md`; Art Bible: `docs/ART_BIBLE.md`; historia: `docs/STORY.md`; projekt poziomów: `docs/LEVEL_DESIGN.md`. Nie deklarujemy jeszcze ukończonej kampanii ani wizualnej weryfikacji w prawdziwej przeglądarce. Etapy są raportowane jawnie.


## Rewrite preview status

The Phaser rewrite is on branch `feat/phaser-rewrite` and is **not deployed to a public URL yet**. Run locally with Node.js 22.12 or newer: `npm install`, then `npm run dev`. The quality workflow produces menu/gameplay/map screenshots as an artifact for review.


## Phaser rewrite status

The rewrite is on `feat/phaser-rewrite` and is not deployed to a public URL yet. Run locally with Node.js 22.12 or newer: `npm install`, then `npm run dev`. The CI workflow builds the game, runs unit/regression/lint/level validation and Playwright smoke checks, and uploads screenshots as an artifact. See `docs/PLAN.md` and `REVIEW.md` for implemented scope and remaining work.
