# ISKRA: 360 Światów — zasady pracy

Budujemy oryginalną platformówkę 2D w Phaser 3.90.0 + Vite + TypeScript strict. Inspiracja dotyczy jakości warstw i animacji, nigdy kopiowania cudzych postaci, nazw, muzyki ani assetów.

## Gałęzie i etapy
Pracuj wyłącznie na `feat/phaser-rewrite`; nie commituj do `main`, nie rób force-push i nie scalaj bez zgody właściciela. Każdy etap to osobny Conventional Commit, build/test/lint/walidacja poziomów i krótki raport. Nie deklaruj weryfikacji, której nie wykonano.

## Komendy
- `npm run dev` — lokalny serwer Vite
- `npm run build` — ścisłe sprawdzenie TS i build do `dist/`
- `npm test` — Vitest + regresje wersji legacy
- `npm run lint` — ESLint
- `npm run validate:levels` — walidacja struktury kampanii

## Konwencje
- Logika symulacji niezależna od renderera, stały krok 60 Hz; nie używaj czasu klatki do symulacji.
- Losowość gameplayu wyłącznie przez seeded PRNG; żadnego `Math.random()` w ścieżkach deterministycznych.
- Wszystkie teksty w słownikach `src/core/i18n.ts`, PL/EN.
- Dane poziomów deklaratywne i walidowane; proceduralne tekstury generuj raz i cache'uj.
- Zapis wersjonowany, sanityzowany; zachowaj klucze `iskra360-save` i `iskra360-save-backup`.
- Moduły gameplayu muszą dać się testować bez Phasera/WebGL.
- Uwzględniaj reduced motion, safe-area, pad i dotyk; unikaj gigantycznych linii.

## Architektura
`core/` — czas, RNG, zapis, input; `gameplay/` — kontroler, walka, power-upy; `levels/` — dane i walidator; `art/` — palety, tła, animacje; `audio/` — synteza; `ui/` — HUD/i18n; `scenes/` — ekrany Phasera.
