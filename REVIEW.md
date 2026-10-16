# REVIEW — stan legacy i przebudowy

## Wersja legacy

Wersja referencyjna została zachowana w `legacy/index.html` i `legacy/engine-3d.js`. Jej regresje uruchamia `node tests/regression.js`; to testy Node/VM, nie test prawdziwego renderera ani przeglądarki.

Znane problemy zgłoszone w legacy i nieuznawane za rozwiązane przez samą migrację: farmienie kryształów przy powtarzaniu poziomu, brak pełnej mechaniki kluczy i serc, niepełna ochrona przed wszystkimi hazardami, brak dopracowanego ekranu game over oraz niezweryfikowana przechodniość wszystkich 360 generowanych poziomów.

## Przebudowa Phaser

- Nowy punkt wejścia: Vite + Phaser 3.90.0 + TypeScript strict.
- Logika ruchu jest wydzielona do czystego kontrolera z krokiem 60 Hz; dodano testy bufora skoku, podwójnego skoku, dasha i szybowania.
- Zapis otrzymał wersję 2, sanityzację i migrację pól legacy (odblokowanie, kryształy, ukończone poziomy, ulepszenia); backup może być użyty, gdy główny JSON jest uszkodzony.
- Dane kampanii deklarują 4 światy × 5 poziomów; poziom rytmiczny to numer 3, boss numer 5.
- Pierwszy vertical slice jest prototypem technicznym, nie finalnym poziomem komercyjnym. Walka, power-upy, audio, sekrety, ekran game over, solver przechodniości i testy Playwright pozostają do wykonania w kolejnych etapach.

## Walidacja

Zielone testy jednostkowe nie dowodzą jakości wizualnej, poprawności dotyku/pada ani stabilnych 60 FPS. Każdy z tych punktów wymaga uruchomienia w przeglądarce i jawnego raportu. Nie deklarować ukończonego buildu, dopóki CI nie potwierdzi build/test/lint/validate.

## Przebudowa — fundament (commit 4806daa)

Nowa architektura została dodana na gałęzi `feat/phaser-rewrite`: Vite/Phaser/TypeScript, kontroler ze stałym krokiem, migracja zapisu, słowniki PL/EN, dane 4×5 poziomów oraz prototyp pierwszej sceny. Build i testy CI są w trakcie weryfikacji; nie należy traktować tego prototypu jako pełnej gry ani finalnej oprawy.


## Phaser rewrite review — October 2026

**CI verified on commit 83df18f:** Vite/TypeScript build, Vitest modules, legacy regression harness, ESLint, level-structure validation and Playwright Chromium smoke passed. The browser smoke checks menu, first-world start, world-map navigation and a mobile-sized viewport. Screenshots are in the `iskra-visual-smoke` workflow artifact.

### Known gaps (not to be marked as done)
- No human visual review of the screenshots or real-device control-feel review has been performed.
- The campaign currently reuses five layout patterns with biome-specific variations; the 20 level definitions are not yet 20 bespoke, polished layouts.
- Level validation checks data structure/spawn/exit, not full reachability through jump, glide and dash.
- Boss phase logic, full hazard set and shield integration, three unique enemy archetypes per world, secrets/friend rescue, cosmetic shop, achievements, daily challenge, infinite mode, rhythm auto-run and speedrun ghost are incomplete.
- No measured FPS/performance report yet. The rewrite has not been deployed to a public preview URL.

Run locally with Node 22.12+: `npm install && npm run dev`.
