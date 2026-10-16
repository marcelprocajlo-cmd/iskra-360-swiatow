# Etap 08 — Oprawa graficzna i modelowanie

- Status: wdrożono pierwszą dużą warstwę odświeżenia wizualnego.
- Blob SHA bieżącego `index.html`: `7a07b64084dbc9b100d3451b3630291a5cdfbf29`.
- Archiwum: [index.html](./index.html).

## Zmiany
- Dodano odrębne sylwetki tła dla 12 biomów: mechaniczne panoramy, leśne korony, wydmy, lodowe iglice, złomowiska, wyspy chmur, wulkany, kwantowe okręgi i widmowe budowle.
- Tła wykorzystują ruch paralaksy, co zwiększa głębię sceny.
- Przebudowano model Iskry: antena z pulsującym światłem, pancerz warstwowy, wizjer, rdzeń energetyczny, stawy, ramiona, nogi i poświata zależna od dashu.
- Przebudowano sylwetki przeciwników oraz strażników; boss ma kolczastą koronę, wyraźniejsze oczy, kontur i pasek HP.
- Wzmocniono styl interfejsu: półprzezroczyste panele, delikatne rozmycie, cienie, stany hover i widoczne obrysy klawiaturowe.

## Kontrole wykonane
- Parsowanie JavaScript: PASS.
- Symulowane uruchomienie skryptu: PASS.
- Przełączenie wszystkich 360 poziomów w atrapie DOM/Canvas: PASS.
- Test pomocy, pauzy, dźwięku, zakupu ulepszenia i kopii zapisu w środowisku symulowanym: PASS.

## Ograniczenia
- To szczegółowe modelowanie rysowane w Canvas, nie modele 3D ani zewnętrzne assety.
- Nie wykonano jeszcze oględzin w rzeczywistej przeglądarce na różnych ekranach.
