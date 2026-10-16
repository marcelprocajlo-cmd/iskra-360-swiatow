# Plan testów — ISKRA: 360 Światów

## Automatyczne testy regresyjne

Uruchom z katalogu głównego repozytorium:

```bash
node tests/regression.js
```

Zestaw sprawdza uruchomienie gry w lekkim środowisku DOM/Canvas, sanitizację uszkodzonego zapisu, generator 360 poziomów, harmonogram bossów, stały krok 60 Hz, tarcie pustyni, blokadę następnego poziomu, aktualizację AI przy modelach 3D, kolizję ze strażnikiem po trafieniu, nietykalność po utracie osłony, kruszenie platform, kopię zapasową, kotwiczenie obiektów, coyote time, granicę świata, autorepeat klawiszy oraz renderowanie bez ponownego generowania poziomu.

Testy są wykonywane w Node.js i nie są testem prawdziwej przeglądarki ani WebGL.

## Ręczny test przeglądarkowy

- Otwórz poziomy 1, 30, 61, 90, 180 i 360.
- Sprawdź ruch, skok, podwójny skok, dash, atak i pauzę.
- Włącz/wyłącz modele 3D; potwierdź brak zdublowanych sprite'ów oraz działanie AI. Sprawdź, że strażnik nadal zadaje obrażenia po wcześniejszym trafieniu atakiem.
- Sprawdź ruchome i kruche platformy, kolce, lasery, lawę i checkpoint.
- Sprawdź zapis, odświeżenie, reset i przywrócenie kopii.
- W DevTools sprawdź błędy w Console oraz status `index.html`, `engine-3d.js` i biblioteki Three.js w Network.

## Ograniczenia

Testy regresyjne nie potwierdzają samodzielnie przechodniości wszystkich 360 poziomów ani poprawności na każdym urządzeniu.


## Phaser rewrite automated gates

1. `npm run build` — strict TypeScript and Vite production bundle.
2. `npm test` — Vitest modules plus legacy regression harness.
3. `npm run lint` — ESLint.
4. `npm run validate:levels` — structure, IDs, spawn and exit (not a reachability solver).
5. `npm run test:e2e` — Playwright Chromium smoke for menu, first world, world map, mobile-sized viewport, and page errors. Screenshots are uploaded as the `iskra-visual-smoke` workflow artifact.

A screenshot artifact is not a substitute for human art-direction review. No FPS claim is made without a measured performance report.


## Phaser rewrite automated gates

1. `npm run build` — strict TypeScript and Vite production bundle.
2. `npm test` — Vitest modules plus legacy regression harness.
3. `npm run lint` — ESLint.
4. `npm run validate:levels` — level structure, IDs, spawn and exit checks; not a reachability solver.
5. `npm run test:e2e` — Playwright Chromium smoke for menu, first world, world map and mobile-sized viewport, plus browser page errors. Screenshots are uploaded as `iskra-visual-smoke`.

A screenshot artifact is not a substitute for human art-direction review. No performance/FPS claim is made without a measured report.
