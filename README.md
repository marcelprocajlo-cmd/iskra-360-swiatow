# ISKRA: 360 Światów

Neonowa platformówka z animowanym rendererem 3D (Three.js) i awaryjnym trybem 2D Canvas. 360 poziomów, 12 biomów, walka, bossowie, kryształy, ulepszenia i osiągnięcia.

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

## Modele 3D na planszy 2D
- Platformówka, tła, platformy i pułapki pozostają w klasycznym widoku 2D.
- Three.js renderuje jako przezroczystą nakładkę wyłącznie przestrzenny model Iskry, przeciwników, kryształów i portalu.
- Iskra ma przegubowe kończyny, animację biegu i skoku, ruch głowy i anteny oraz efekt dashu.
- Przycisk **Modele 3D: ON/OFF** przełącza modele 3D; oryginalny sprite 2D wraca po wyłączeniu. Tryb 3D wymaga CDN i WebGL.

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
- [09 — modele 3D i animacje](releases/etap-09-modele-3d/)

## Kontrola jakości
Wykonywano kontrolę składni JavaScript i testy obecności kluczowych funkcji. Etap 07 obejmuje też test automatyczny na atrapach DOM/Canvas oraz przełączenie wszystkich 360 poziomów. To nie zastępuje testu w prawdziwej przeglądarce ani na telefonie; listę testów opisuje `TEST_PLAN.md`.

## Stack
HTML, CSS, JavaScript, Canvas 2D dla planszy oraz Three.js 0.160 z CDN do nakładki modeli 3D.


## Debugowanie i testy regresyjne

Poprawki stabilności i testy regresyjne znajdują się w gałęzi `fix/regression-debug-2026-10`. Uruchom testy z katalogu głównego:

```bash
node tests/regression.js
```

Testy uruchamiają skrypt gry w lekkim środowisku Node.js z atrapami DOM/Canvas. Nie zastępują testu w prawdziwej przeglądarce, w szczególności testów WebGL, dotyku i układu na różnych rozdzielczościach. Szczegóły zmian: [REVIEW.md](REVIEW.md), procedura ręczna: [TEST_PLAN.md](TEST_PLAN.md).
