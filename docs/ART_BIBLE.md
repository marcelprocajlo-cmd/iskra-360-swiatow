# Art Bible — ISKRA: 360 Światów

## Obietnica wizualna
Oryginalna magiczno-tajemnicza platformówka o wrażeniu ręcznie malowanym, choć wszystkie assety powstają z kodu. Inspiracją jest poziom dopracowania i animacyjny „sok”, nie konkretne projekty Rayman Legends. Nie kopiujemy postaci, nazw, muzyki, kadrów ani assetów.

## Paleta i światło
Baza to granat/indygo/morska zieleń/fiolet, nigdy jednolita ściana. Iskra ma ciepły rdzeń (#FFF4C4 → #FFC56E → #FF7B4C), turkusowy rim-light i ciemną obwódkę dla czytelności. Mrok: śliwka, atrament i grafit; nie zlewa się z platformami.

- **Mechaniczny Świt:** granat, miedź, turkus; zębate łuki, mosty i mosiężne światła.
- **Szmaragdowa Knieja:** zieleń, mięta, ciepłe pyłki; korzenie, liście, zarodniki i świetliki.
- **Pustynia Luster:** terakota, bursztyn i szkło; miraże, wydmy i ostre refleksy.
- **Zamarznięta Orbita:** granat lodu, błękit i perła; odłamki, pierścienie i kryształy.

## Warstwy i atmosfera
Cel: 5–7 planów — gradient nieba/światło, dalekie sylwety, pejzaż, środkowe formacje, platformy/akcja, przedni plan, mgła/drobinki. Każdy plan ma własny parallax. Kamera śledzi Iskrę z lekkim wyprzedzeniem; w tle są promienie, miękka mgła, pył i subtelne falowanie.

## Materiał i forma
Warstwowe gradienty, półprzezroczyste obrysy, cienie i rim light zamiast ostrych jednolitych wektorów. Szum/ziarno generuj raz do tekstur/cache, nie w każdej klatce. Silhouette-first: Iskra i niebezpieczeństwa pozostają czytelne przy zmniejszonej jasności i dla osób z zaburzeniami widzenia barw.

## Animacja
Iskra: oddech/mrugnięcia, anticipacja skoku, squash przy lądowaniu, ogon z opóźnieniem, nieregularny płomień, smuga dasha, obrót ogona przy szybowaniu, hit-stop przy trafieniu, błysk przy zbieraniu i poza po rozpaleniu Latarni. Docelowo ogon na łańcuchu Verlet. Rośliny kołyszą się z różną fazą, neony oddychają, drobinki dryfują zależnie od biomu; ostrzeżenia platform są zawsze czytelne.

## Efekty i budżet
Phaser FX (glow/vignette/bloom) tylko w WebGL; Canvas zachowuje czytelność. Low wyłącza kosztowne efekty i ogranicza cząsteczki; medium subtelne glow; high bloom i mgła. Reduced motion ogranicza shake, migotanie i amplitudę; brak szybkich pełnoekranowych błysków.

## Dźwięk i UI
Syntetyczne SFX mają być krótkie, ciepłe i harmonijne; nie udajemy orkiestry, jeśli synteza brzmi sztucznie. UI przypomina artefakty świata (metal, szkło, światło), ale pozostaje skalowalny i dostępny.
