# Changelog

## Etap 09 — modele 3D na planszy 2D
- Zachowano klasyczną planszę platformówki 2D: tła, platformy i pułapki nadal rysuje Canvas.
- Dodano przezroczystą nakładkę Three.js wyłącznie dla modelu Iskry, przeciwników, kryształów i portalu.
- Dodano animacje przegubowych kończyn, głowy, anteny, biegu, skoku i dashu.
- Dodano przełącznik modeli 3D ON/OFF, który przywraca sprite 2D po wyłączeniu.
- Tryb modeli 3D wymaga CDN Three.js i obsługi WebGL; nie wykonano testu w prawdziwej przeglądarce.

## Etap 08 — oprawa graficzna i modelowanie
- Rozbudowano rysowany model Iskry: antena, pancerz, wizjer, rdzeń energetyczny, ramiona i nogi.
- Dodano 12 wariantów panoram biomów z paralaksą i charakterystycznymi sylwetkami.
- Przebudowano rysunki przeciwników i bossów.
- Ulepszono wizualny styl paneli, cienie, hover i obrysy klawiaturowe.
- Przetestowano składnię oraz symulowane przełączanie 360 poziomów.

## Etap 07 — przygotowanie do wydania
- Uzupełniono dokumentację, archiwum wydań i plan testów.
- Dopracowano śliskość lodowych platform, kierunek wiatru i efekt ataku.

## Etap 06 — osiągnięcia i statystyki
- Sześć osiągnięć, statystyki gry, kopia zapasowa i odzyskiwanie zapisu.
- Nagroda za poziom przyznawana tylko przy pierwszym ukończeniu.

## Etap 05 — interfejs
- Pauza pod P/Escape, dźwięki z przełącznikiem, panel sterowania i responsywne przyciski dotykowe.

## Etap 04 — światy
- Lodowe platformy, strefy wiatru, lawa i dodatkowe kryształy w biomie finałowym.

## Etap 03 — progresja
- Warsztat z ulepszeniami Dash, Skok i Osłona oraz trwałym zapisem zakupów.

## Etap 02 — walka i bossowie
- Atak Z/C, bossowie z 3 HP, szarża, pasek zdrowia i nagrody za pokonanie.

## Etap 01 — stabilność
- Naprawiono nieprawidłowe znaki nowej linii w skrypcie.
- Kryształy i kary walutowe są zapisywane natychmiast.


## Debugowanie regresji — październik 2026
- Dodano stały krok symulacji 60 Hz i poprawiono tarcie Pustyni Luster.
- Naprawiono blokadę następnego poziomu, coyote time, kruszenie platform, nietykalność i granicę świata.
- Zabezpieczono parsowanie zapisu i kopię zapasową; ruchome platformy przenoszą przypięte kryształy oraz kolce.
- Rozdzielono logikę aktualizacji wrogów od renderowania modeli 3D, żeby AI działało także w trybie 3D.
- Dodano `tests/regression.js`, `tests/harness.js` i raport `REVIEW.md`.
- Usunięto globalne przepisywanie ścieżek z `vercel.json`, które mogło zwracać `index.html` zamiast plików JS i archiwów.
