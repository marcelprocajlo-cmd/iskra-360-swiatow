# Plan przebudowy ISKRA: 360 Światów

## Decyzje
- **Gałąź:** `feat/phaser-rewrite`; legacy pozostaje w `legacy/`, katalogu `releases/` nie zmieniamy.
- **Stack:** Phaser 3.90.0 + Vite 8.3.4 + TypeScript 5.9.3 strict; Node >=22.12. Phaser FX istnieją od 3.60, ale wymagają WebGL.
- **Rozdzielczość:** 1280×720, Scale.FIT + CENTER_BOTH, skalowanie HiDPI i safe-area na telefonach.
- **Symulacja:** własny kontroler, stały krok 1/60 s; Phaser obsługuje sceny, input i render, nie determinizm ruchu.
- **Kampania:** 4 światy × 5 poziomów (20 poziomów) w pierwszym zakresie. Każdy świat ma rytm na poziomie 3 i bossa na poziomie 5. Do 6 światów rozszerzamy dopiero po utrzymaniu jakości i walidacji pierwszych 20.
- **Grafika:** generatory kodowe, 5–7 warstw parallax, cache tekstur, glow/vignette tylko w WebGL i z możliwością ograniczenia.
- **Dźwięk:** Web Audio API; najpierw czytelne syntetyczne SFX, potem sekwencer muzyczny i warstwy reagujące na walkę.

## Etapy
0. Rozpoznanie, Art Bible, plan, historia, zachowanie legacy.
1. Vite/Phaser/TS strict, stały krok, kontroler, klawiatura/pad/dotyk, zapis z migracją, i18n i testy.
2. Vertical slice pierwszego świata: proceduralna scenografia, światło, parallax, animowana Iskra i ogon; ocena względem Art Bible.
3. Walka (combo, charge, rzut), szybowanie, power-upy, zdrowie/game over, AI.
4. Audio: mikser, SFX, sekwencer i motywy świata 1/bossa.
5. UI/meta: mapa, wybór poziomu, pauza, ustawienia, sklep kosmetyczny, Kuźnia, osiągnięcia, podsumowanie.
6. Kampania: strojenie 20 poziomów, bossowie, sekrety, przyjaciele i solver przechodniości.
7. Poziomy rytmiczne sterowane AudioContext.currentTime, kalibracja i tryb bez dźwięku.
8. Nieskończona Droga, wyzwanie UTC, deterministyczny replay i duch.
9. Szlif, Playwright, pomiar FPS, dostępność, balans i raport końcowy.

## Definition of Done
`npm run build`, `npm test`, `npm run lint`, `npm run validate:levels` bez błędów; brak błędów konsoli podczas pierwszego poziomu; stały krok niezależny od odświeżania; obsługa klawiatury/pada/dotyku; kompletne PL/EN; migracja starego zapisu; udokumentowany pomiar wydajności.

## Ryzyka i uczciwość
Proceduralna grafika może być bardziej geometryczna niż malarska; redukujemy to gradientami, warstwami, miękkim światłem, ziarnem i animacją, nie obietnicą fotorealizmu. Zielone testy Node nie zastępują przeglądarki, Playwrighta, testu dotykowego ani pomiaru FPS. Obecny walidator sprawdza strukturę/spawn/wyjście, ale solver zasięgu skoku i dash pozostaje zadaniem przed wydaniem kampanii.


## Current implementation status

- **Stage 0:** plan, art bible, story and repository rules are present.
- **Stage 1:** Phaser/Vite/strict TS, fixed-step player controller, keyboard/pad/touch input, PL/EN strings and versioned save migration are implemented. Full key rebinding remains open.
- **Stage 2:** procedural parallax, cached grain, biome silhouettes and Verlet flame tail are implemented. CI captures screenshots, but a human has not yet reviewed them for art direction.
- **Stage 3:** combo/charge/throw foundations, one patrol enemy, timed power-ups and game-over/retry exist. Bosses now have three health phases and phase-dependent speed escalation; bespoke attacks/telegraphs, complete hazard interactions and per-biome enemy rosters remain.
- **Stage 4:** synthesized SFX, volume buses and an AudioContext-time music sequencer exist. Musical composition and transitions still need tuning.
- **Stage 5:** main menu, world map, level selection and settings exist. Shop, achievements, daily challenge and speedrun UI remain.
- **Stage 6:** 20 level definitions exist, but they reuse five base layouts with biome-specific variations. Bespoke level-by-level design and a jump/glide/dash reachability solver remain.
- **Stages 7–8:** BeatClock is tested, but rhythm auto-run gameplay, infinite mode, daily seed mode and deterministic ghost replay are not implemented.
- **Stage 9:** CI covers build, unit/regression tests, lint, structure validation and Playwright smoke. FPS profiling and manual browser art review remain.

The preceding code snapshot passed all CI gates including Playwright: [run 38957856261](https://github.com/marcelprocajlo-cmd/iskra-360-swiatow/actions/runs/38957856261). The `iskra-visual-smoke` artifact contains menu, first-world and world-map screenshots; artifact output is not committed as PNG files.


## Current implementation status (2026-10-16)

- **Foundation:** Phaser/Vite/strict TypeScript, fixed-step player controller, keyboard/gamepad/touch input, PL/EN localization, resilient versioned save migration and settings persistence.
- **Art:** procedural parallax backgrounds for four biomes, cached paper grain, animated flame tail and menu/map/game-over/finale screens. CI screenshots are available as artifacts; manual art-direction review is still needed.
- **Combat:** combo/charge/throw foundations, three visually distinct patrol archetypes, enemy HP, friend rescue rewards, timed power-ups, shield interaction and game-over/retry.
- **Audio:** synthesized SFX, separate volume buses and an AudioContext-time music sequencer.
- **Campaign:** 20 level definitions in four worlds, world map/selection, progress unlocks and a finale after level 20.
- **Still open:** handcrafted/polished layout for every level, formal jump/glide/dash reachability solver, unique enemy behaviors/rosters per biome, bespoke boss attacks/telegraphs (basic health phases exist), complete hazards, shop/achievements/daily challenge, full rhythm auto-run mode, infinite/daily seed and ghost replay, performance profiling and human visual review.

CI run [38960679972](https://github.com/marcelprocajlo-cmd/iskra-360-swiatow/actions/runs/38960679972) checks the current code before the latest documentation update. A passing screenshot artifact is not a substitute for a manual playthrough. No public preview deployment is configured.
