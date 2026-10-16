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
