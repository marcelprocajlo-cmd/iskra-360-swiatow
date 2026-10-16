# Etap 02 — Walka i bossowie

- Status: ukończona implementacja podstawowej walki.
- Źródło: `index.html` na gałęzi `main`.
- Blob SHA pliku źródłowego: `e14ae28bc7fba0b7b12deb84f018231b8fc3dad2`.
- Commit archiwum: `abc2c5f1f2059f44a8a8f335fe5192d06a7b6e61`.

## Zmiany
- Dodano atak wręcz pod klawiszami Z/C oraz przycisk dotykowy.
- Dodano czas aktywacji i odnowienia ataku oraz blokadę wielokrotnego trafienia tego samego przeciwnika w jednym zamachu.
- Zwykli przeciwnicy mają nagrodę kryształową po pokonaniu.
- Strażnicy co 30 poziomów mają 3 punkty życia; kolejne trafienia obniżają HP, a pasek zdrowia odzwierciedla stan.
- Strażnik przyspiesza wraz ze spadkiem zdrowia i wykonuje sygnalizowany, szybki szarżujący ruch.
- Pokonanie strażnika daje 10 kryształów; waluta zapisywana jest natychmiast.
- Zachowano wymóg pokonania strażnika przed ukończeniem poziomu bossa.

## Kontrole wykonane
- Parsowanie składni JavaScript: PASS.
- Kontrola obecności sterowania klawiaturą i dotykiem: PASS.
- Kontrola logiki HP, nagrody oraz szarży bossa: PASS.
- Nie wykonano testu w rzeczywistej przeglądarce; raport nie oznacza pełnego testu gry.
