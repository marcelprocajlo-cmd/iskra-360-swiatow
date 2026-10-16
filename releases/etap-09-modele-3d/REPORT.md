# Etap 09 — modele 3D na planszy 2D

## Założenie
Gra pozostaje klasyczną platformówką 2D. Tła biomów, geometria poziomów, platformy, pułapki, fizyka i kamera gry nadal należą do renderera Canvas 2D.

## Modele 3D jako warstwa graficzna
- Przezroczysta nakładka Three.js renderuje przestrzenny model Iskry, przeciwników, kryształów i portalu.
- Iskra ma przegubowe kończyny, animację biegu/skoku, ruch głowy i anteny oraz efekt dashu.
- Przycisk „Modele 3D: ON/OFF” przełącza nakładkę i przywraca sprite 2D.

## Ograniczenia i testy
- Three.js 0.160 ładowany jest z jsDelivr CDN; nakładka wymaga WebGL i dostępu do CDN.
- Modele są proceduralnie budowane z geometrii Three.js, nie są zewnętrznymi assetami GLB/GLTF.
- Wykonano kontrolę spójności struktury kodu; nie wykonano testu w prawdziwej przeglądarce.
