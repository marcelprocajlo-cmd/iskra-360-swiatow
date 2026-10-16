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
