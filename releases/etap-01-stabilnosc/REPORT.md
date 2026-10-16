# Etap 01 — Stabilność i kontrola gry

- Status: ukończona pierwsza partia napraw bazowych.
- Źródło: `index.html` na gałęzi `main`.
- Commit źródłowy: `7eef987178b2c19b8f356a141fe08dbace289278` (blob SHA pliku).
- Commit archiwum: `6c4742f898dcf23ebedf3c30e397ec6501662d49`.

## Zmiany
- Usunięto dwie sekwencje literalnego `\\n`, które znajdowały się w kodzie JavaScript zamiast rzeczywistych podziałów wiersza.
- Zapis kryształów następuje od razu po zebraniu, a nie dopiero po ukończeniu poziomu.
- Zapis waluty aktualizuje się również po karze za serię zgonów.

## Kontrole wykonane
- Parsowanie składni skryptu JavaScript przez kompilację funkcji: PASS.
- Liczba pozostałych literalnych sekwencji `\\n` w HTML: 0.
- Kontrola obecności zapisu waluty przy zbieraniu kryształu: PASS.

## Ograniczenia
- Nie wykonano jeszcze testu w prawdziwej przeglądarce.
- Wykryte dalsze problemy z zachowaniem bossów zostaną obsłużone w etapie 02.
