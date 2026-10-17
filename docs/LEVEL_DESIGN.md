# Projekt poziomów — kampania 1.0

Zakres pierwszego wydania to 4 światy × 5 poziomów. Poziom rytmiczny jest numerem 3, boss numerem 5. Każdy świat ma własną paletę, motyw, trzy typy wrogów i jednego Strażnika Mroku.

| Świat | Motyw | Wrogowie | Boss |
|---|---|---|---|
| Mechaniczny Świt | rytm, przekładnie, ruchome mosty | Zardzewiała Ćma, Zegarowy Skoczek, Sękaty Wartownik | Strażnik Bez Świtu |
| Szmaragdowa Knieja | szybowanie, pnącza, sekrety | Cierniowy Pająk, Głodny Zarodnik, Korzeniowy Strażnik | Matka Cierni |
| Pustynia Luster | miraże, wiatr, szkło | Szklany Skorpion, Pyłowy Upiór, Odbicie | Król Bez Twarzy |
| Zamarznięta Orbita | niska grawitacja, pierścienie, ślizg | Lodowy Roztocz, Dryfujący Odłamek, Zimny Wędrowiec | Astronom Mrozu |

Dane są deklaratywne w `src/levels/storyLevels.ts`. Aktualny walidator sprawdza strukturę, unikalność identyfikatorów, spawn/wyjście i parametry platform. Nie jest jeszcze solverem osiągalności łuku skoku/szybowania/dasha — to wymagany etap przed uznaniem kampanii za gotową.
