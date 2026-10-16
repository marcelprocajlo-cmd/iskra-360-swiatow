# Etap 09 — modele 3D i bogatsze animacje

## Zakres
- Dodano niezależny renderer Three.js/WebGL synchronizowany ze stanem gry.
- Iskra ma przestrzenny pancerz, wizjer, rdzeń, plecak, antenę oraz osobno animowane ręce i nogi.
- Animacje obejmują cykl biegu, ruch głowy i anteny, skok, przechylenie oraz rozciągnięcie i poświatę dashu.
- Poziomy otrzymały przestrzenne platformy, kryształy, portale, pułapki, modele przeciwników i bossów.
- Dodano przełącznik 3D ON/OFF; Canvas 2D pozostaje trybem awaryjnym.

## Zależności i ograniczenia
- Three.js 0.160 ładowany jest z jsDelivr CDN; tryb 3D wymaga dostępu do CDN i obsługi WebGL.
- Modele są proceduralnie budowane z geometrii Three.js; nie dodano plików GLB/GLTF.
- Nie wykonano testu w prawdziwej przeglądarce ani na urządzeniu mobilnym.

## Pliki
- `index.html` — główna gra i integracja widoku 3D.
- `engine-3d.js` — scena WebGL, modele i animacje.
