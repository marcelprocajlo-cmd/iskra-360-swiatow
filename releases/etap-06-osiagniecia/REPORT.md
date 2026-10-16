# Etap 06 — Osiągnięcia i statystyki

- Status: ukończono system osiągnięć i odzyskiwania zapisu.
- Blob SHA pliku źródłowego: `b165fa1fdab115ae9221cfa53492417bfcbbd8e0`.
- Archiwum: [index.html](./index.html).

## Zmiany
- Dodano sześć osiągnięć za postęp, kryształy, pokonanych przeciwników, bossów i ukończenie 360 poziomów.
- Dodano statystyki ukończonych poziomów, zebranych kryształów, przeciwników, bossów i zgonów.
- Każdy postęp w osiągnięciach i statystykach jest zapisywany.
- Dodano kopię poprzedniego zapisu w `localStorage` i przycisk odzyskiwania kopii.
- Starsze zapisy otrzymują domyślne pola statystyk i osiągnięć.
- Nagroda za ukończenie poziomu jest przyznawana tylko przy pierwszym ukończeniu, co zapobiega farmieniu kryształów przez powtarzanie tego samego poziomu.

## Kontrole wykonane
- Parsowanie składni JavaScript: PASS.
- Kontrola obecności osiągnięć, statystyk, kopii zapasowej i odzyskiwania: PASS.
- Kontrola nagrody za pierwsze ukończenie: PASS.
- Nie wykonano testu w rzeczywistej przeglądarce.
