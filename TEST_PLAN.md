# Plan testów — ISKRA: 360 Światów

## Kontrole automatyczne wykonane
- Parsowanie składni JavaScript w skrypcie osadzonym w `index.html`: PASS.
- Brak literalnych sekwencji `\\n` w HTML: PASS.
- Uruchomienie skryptu z atrapami DOM, Canvas, localStorage i requestAnimationFrame: PASS.
- Utworzenie mapy 360 przycisków i przełączenie kolejno wszystkich 360 poziomów w środowisku symulowanym: PASS.
- Obsługa przycisków pauzy, pomocy sterowania, dźwięku i zakup ulepszenia w środowisku symulowanym: PASS.
- Potwierdzenie utworzenia bieżącego zapisu i kopii zapasowej w środowisku symulowanym: PASS.

## Testy ręczne wymagane przed publikacją
1. Otworzyć `index.html` w aktualnej wersji Chrome, Firefox, Edge i Safari.
2. Sprawdzić ruch, skok, podwójny skok, wall jump, dash i atak.
3. Przejść poziomy z ruchomymi, kruchymi, sprężynowymi i lodowymi platformami.
4. Sprawdzić wiatr w Pustyni Luster, lawę w Wulkanicznym Pulsie i cykliczne lasery.
5. Pokonać strażnika na poziomie 30: potwierdzić 3 punkty życia, szarżę, nagrodę i blokadę portalu do czasu pokonania bossa.
6. Kupić każde ulepszenie, odświeżyć stronę i potwierdzić zachowanie postępu.
7. Ukończyć ten sam poziom ponownie i sprawdzić, że nagroda za pierwsze ukończenie nie jest przyznawana drugi raz.
8. Sprawdzić osiągnięcia, statystyki, reset zapisu i odzyskiwanie kopii.
9. Przetestować pauzę, wyłączenie dźwięku, panel sterowania oraz przyciski dotykowe na telefonie.
10. Sprawdzić konsolę przeglądarki, rozmiary ekranu, wydajność i odświeżenie strony.

## Ograniczenia raportu
Test symulowany w środowisku narzędziowym nie emuluje pełnego silnika przeglądarki, fizycznego dotyku, rzeczywistego dźwięku ani zachowania Canvas w różnych przeglądarkach. Przed publikacją wymagane są testy ręczne z listy powyżej.
