# Przegląd i poprawki regresyjne — ISKRA: 360 Światów

## Zakres zmian

W gałęzi `fix/regression-debug-2026-10` poprawiono:

- stały krok symulacji 60 Hz zamiast aktualizacji zależnej od odświeżania ekranu;
- tarcie w Pustyni Luster (poziomy 61–90), które mogło zwiększać prędkość po puszczeniu ruchu;
- blokadę przycisku „Następny poziom” do czasu ukończenia bieżącego poziomu;
- aktualizację AI i kolizji wrogów także wtedy, gdy renderowane są modele 3D;
- zachowanie kolizji z bossem po trafieniu — trafienie nie wyłącza już kolizji z graczem;
- okno nietykalności po utracie osłony i po odbiciu od przeciwnika;
- cykl kruchych platform: 35 klatek ostrzeżenia, 100 klatek nieobecności;
- sanitizację uszkodzonego zapisu, w tym `unlocked: "abc"`;
- zachowanie kopii zapasowej pomiędzy kolejnymi zapisami oraz snapshot przed resetem/przywróceniem;
- podążanie kryształów i kolców za ruchomymi platformami;
- coyote time i warunek pierwszego skoku;
- prawą granicę świata;
- ignorowanie autorepeat dla klawiszy ataku/dasha;
- usunięcie generowania poziomu z funkcji rysującej wykonywanej każdą klatkę;
- ograniczenie rysowania duplikatów 2D, gdy aktywne są modele 3D.

## Testy

**Ostatni przebieg GitHub Actions przed ostatnią poprawką: 17/17 testów zaliczonych. Dodano test 18 dotyczący kolizji ze strażnikiem; nowy przebieg CI powinien go zweryfikować.** (Node.js 22, 16 października 2026). To testy regresyjne w lekkim środowisku DOM/Canvas, nie test prawdziwej przeglądarki.

Uruchom z katalogu głównego repozytorium:

```bash
node tests/regression.js
```

Zestaw testów tworzy lekkie środowisko DOM/Canvas w Node.js i uruchamia kod gry w VM. Testy nie zastępują ręcznej kontroli w Chrome/Firefox, testów dotykowych ani sprawdzenia renderera WebGL.

## Znane ograniczenia / decyzje niezmieniane

- Kryształy można nadal zdobywać ponownie przez powtarzanie poziomu; nie zmieniano ekonomii gry.
- Klucze i hearts nadal nie mają pełnej mechaniki użycia.
- Osłona nadal nie neutralizuje kolców, laserów ani lawy.
- Testy symulacyjne nie dowodzą, że każdy z 360 poziomów da się ukończyć przy każdym stylu gry.
- Nie deklarujemy testu w prawdziwej przeglądarce; ten zestaw to regresje w Node.js.

## Zalecany test ręczny

1. Uruchom poziomy 1, 30, 61, 90, 180 i 360.
2. Sprawdź skok po zejściu z krawędzi, dash, osłonę i kruchą platformę.
3. Na poziomie z bossem włącz modele 3D i potwierdź, że boss nadal się porusza i przyjmuje obrażenia.
4. Odśwież stronę, sprawdź zapis, reset i przywrócenie kopii.
5. Otwórz DevTools Console i Network; upewnij się, że `engine-3d.js` ładuje się jako JavaScript, a nie jako HTML.
