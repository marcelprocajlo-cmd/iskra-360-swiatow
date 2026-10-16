# Etap 03 — Progresja i ulepszenia

- Status: ukończona implementacja podstawowego warsztatu ulepszeń.
- Blob SHA pliku źródłowego: `5c4ee39bb0b53d8818265bd5bc812891222f0870`.
- Archiwum: [index.html](./index.html).

## Zmiany
- Dodano warsztat z ulepszeniami Dash, Skok i Osłona.
- Każde ulepszenie ma trzy poziomy i rosnący koszt w kryształach.
- Dash skraca czas odnowienia, Skok zwiększa wysokość skoku, a Osłona dodaje ochronę przed jednym kontaktem z przeciwnikiem na poziom ulepszenia.
- Ulepszenia oraz waluta są zapisywane w `localStorage`.
- Zbieranie kryształów i nagrody za pokonanie przeciwników aktualizują zapis natychmiast.
- Reset postępu inicjalizuje także domyślne wartości ulepszeń.
- Dodano bezpieczne wartości domyślne dla starszych zapisów, które nie zawierają pola `upgrades`.

## Kontrole wykonane
- Parsowanie składni JavaScript: PASS.
- Kontrola obecności warsztatu, efektów ulepszeń i zapisu: PASS.
- Kontrola domyślnych danych po resecie: PASS.
- Nie wykonano testu w rzeczywistej przeglądarce.
