# ISKRA: 360 Światów

Neonowa platformówka 2D w HTML, CSS i JavaScript Canvas. 360 poziomów, 12 biomów, walka, bossowie, kryształy, ulepszenia i osiągnięcia.

## Uruchomienie
Otwórz `index.html` w nowoczesnej przeglądarce. Gra nie wymaga zależności ani serwera. Konfiguracja Vercel nie oznacza sama w sobie, że projekt został wdrożony.

## Sterowanie
- **A / D lub strzałki** — ruch.
- **W / ↑ / Spacja** — skok; ponowne naciśnięcie w powietrzu wykonuje podwójny skok.
- **X / Shift** — dash.
- **Z / C** — atak wręcz.
- **P / Escape** — pauza.
- **Skok przy ścianie** — wall jump.
- Na telefonie używaj przycisków ekranowych. Przycisk **Sterowanie** otwiera pomoc.

## Oprawa graficzna
- Model Iskry z warstwowym pancerzem, anteną, rdzeniem, kończynami i efektami świetlnymi.
- 12 wariantów panoram tła z paralaksą i charakterystycznymi kształtami biomów.
- Rozbudowane sylwetki przeciwników i strażników oraz dopracowany interfejs.

## Mechaniki
- 360 poziomów w 12 biomach; strażnik krainy co 30 poziomów.
- Ruch z przyspieszeniem, tarciem, buforem skoku i coyote time.
- Platformy ruchome, sprężynowe, kruche i śliskie lodowe.
- Kolce, lasery, pustynne strefy wiatru i lawa.
- Walka wręcz, przeciwnicy, bossowie z punktami życia i nagrody.
- Warsztat ulepszeń Dash / Skok / Osłona, każde do poziomu 3.
- Pauza, sygnały dźwiękowe z przełącznikiem, pomoc i sterowanie dotykowe.

## Zapis
Postęp zapisuje się lokalnie pod `iskra360-save`; poprzednia kopia jest przechowywana pod `iskra360-save-backup`. Przycisk **Odzyskaj kopię** przywraca poprzedni zapis. Dane nie synchronizują się automatycznie między urządzeniami.

## Archiwum etapów
Każdy ukończony etap ma osobny snapshot i raport:
- [01 — stabilność](releases/etap-01-stabilnosc/)
- [02 — walka i bossowie](releases/etap-02-walka-bossowie/)
- [03 — progresja](releases/etap-03-progresja/)
- [04 — światy](releases/etap-04-swiaty/)
- [05 — interfejs](releases/etap-05-interfejs/)
- [06 — osiągnięcia](releases/etap-06-osiagniecia/)
- [07 — przygotowanie wydania](releases/etap-07-wydanie/)
- [08 — oprawa graficzna i modelowanie](releases/etap-08-oprawa-graficzna/)

## Kontrola jakości
Wykonywano kontrolę składni JavaScript i testy obecności kluczowych funkcji. Etap 07 obejmuje też test automatyczny na atrapach DOM/Canvas oraz przełączenie wszystkich 360 poziomów. To nie zastępuje testu w prawdziwej przeglądarce ani na telefonie; listę testów opisuje `TEST_PLAN.md`.

## Stack
Vanilla JavaScript, HTML Canvas i CSS. Bez zewnętrznych zależności.
