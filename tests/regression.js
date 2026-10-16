'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHarness } = require('./harness');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const inline = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
const engine = fs.readFileSync(path.join(root, 'engine-3d.js'), 'utf8');
assert.ok(inline, 'Główny skrypt inline musi istnieć');

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

test('1. Skrypt parsuje się i gra startuje na poziomie 1', () => {
  new Function(inline);
  const h = createHarness(html);
  assert.equal(h.evaluate('level'), 1);
  assert.ok(h.evaluate('player'));
});

test('2. Uszkodzony zapis nie tworzy level=NaN', () => {
  const h = createHarness(html, { 'iskra360-save': JSON.stringify({ unlocked: 'abc', coins: 'oops', done: 'bad', upgrades: { dash: 999 } }) });
  assert.equal(h.evaluate('level'), 1);
  assert.equal(h.evaluate('saved.coins'), 0);
  assert.equal(h.evaluate('saved.upgrades.dash'), 3);
  assert.ok(Number.isFinite(h.evaluate('level')));
});

test('3. Generator buduje wszystkie 360 poziomów bez wyjątków', () => {
  const h = createHarness(html);
  for (let n = 1; n <= 360; n++) {
    const g = h.evaluate('generate(' + n + ')');
    assert.equal(g.platforms.length, 14, 'poziom ' + n);
    assert.ok(g.worldW > 0);
    assert.equal(g.biome, Math.floor((n - 1) / 30));
  }
});

test('4. Strażnik pojawia się co 30 poziomów i tylko tam', () => {
  const h = createHarness(html);
  for (let n = 1; n <= 360; n++) {
    const hasBoss = h.evaluate('generate(' + n + ').enemies.some(e=>e.boss)');
    assert.equal(hasBoss, n % 30 === 0, 'poziom ' + n);
  }
});

test('5. Pętla używa stałego kroku 60 Hz', () => {
  assert.match(inline, /frameAccumulator/);
  assert.match(inline, /const step=1000\/60/);
  assert.match(inline, /while\(frameAccumulator>=step/);
  assert.doesNotMatch(inline, /function loop\(\)\{update\(\);draw\(\);requestAnimationFrame\(loop\)\}/);
});

test('6. Tarcie pustyni nie zwiększa prędkości po puszczeniu klawisza', () => {
  assert.doesNotMatch(inline, /p\.vx\/=Math\.max\(\.1,phys\.friction\)\*\.97/);
  assert.match(inline, /\(biome===2&&p\.grounded\)\?0\.92:phys\.friction/);
});

test('7. Przycisk następnego poziomu nie omija ukończenia i strażnika', () => {
  const h = createHarness(html);
  h.evaluate('level=1; saved.unlocked=360; won=false');
  h.element('next').onclick();
  assert.equal(h.evaluate('level'), 1);
  assert.match(h.element('toast').textContent, /ukończ/);
});

test('8. Wrogowie i boss aktualizują się również przy aktywnych modelach 3D', () => {
  const h = createHarness(html);
  h.evaluate('start(30); window.__iskra3dActive=true;');
  const before = h.evaluate('enemies.find(e=>e.boss).x');
  h.evaluate('update()');
  const after = h.evaluate('enemies.find(e=>e.boss).x');
  assert.notEqual(after, before);
  assert.doesNotMatch(inline, /attackBox=[^;]+;if\(!window\.__iskra3dActive\)for\(let a of enemies\)/);
});

test('9. Osłona daje okno nietykalności po kontakcie', () => {
  const h = createHarness(html);
  h.evaluate('start(1); let a=enemies.find(e=>e.alive); player.x=a.x; player.y=a.y; player.vx=0; player.vy=0; player.shields=1; player.inv=0; update()');
  assert.equal(h.evaluate('player.shields'), 0);
  assert.ok(h.evaluate('player.inv') > 0);
  assert.match(inline, /p\.shields--;p\.inv=75/);
});

test('10. Krucha platforma odlicza czas i znika czasowo, a nie od razu', () => {
  const h = createHarness(html);
  h.evaluate('start(1); let a=platforms.find(p=>p.type==="crumble"); a.crumble=1; update()');
  assert.equal(h.evaluate('platforms.find(p=>p.type==="crumble").crumbleGone'), 100);
  assert.match(inline, /crumbleGone=100/);
  assert.match(inline, /crumbleGone>0\)continue/);
});

test('11. Istniejąca kopia zapasowa nie jest nadpisywana każdym zapisem', () => {
  const backup = JSON.stringify({ unlocked: 19, coins: 42 });
  const h = createHarness(html, {
    'iskra360-save': JSON.stringify({ unlocked: 4, coins: 2 }),
    'iskra360-save-backup': backup
  });
  h.evaluate('saved.coins=99;persist()');
  assert.equal(h.evaluate('localStorage.getItem("iskra360-save-backup")'), backup);
  assert.equal(JSON.parse(h.evaluate('localStorage.getItem("iskra360-save")')).coins, 99);
});

test('12. Kryształy i kolce na ruchomych platformach mają kotwicę', () => {
  const h = createHarness(html);
  assert.ok(h.evaluate('generate(1).items.some(i=>i.anchor && i.anchor.type==="moving")'));
  assert.ok(h.evaluate('generate(1).hazards.some(i=>i.anchor && i.anchor.type==="moving")'));
  assert.match(inline, /if\(a\.anchor\)a\.y=/);
});

test('13. Coyote time umożliwia pierwszy skok po zejściu z krawędzi', () => {
  const h = createHarness(html);
  h.evaluate('start(1); player.grounded=false; player.coyote=4; player.jumps=0; jumpPressed=true; update()');
  assert.ok(h.evaluate('player.vy') < 0);
  assert.match(inline, /\(p\.coyote>0&&p\.jumps===0\)/);
});

test('14. Iskra nie wychodzi poza prawą granicę poziomu', () => {
  const h = createHarness(html);
  h.evaluate('start(1); player.x=worldW-1; player.vx=10; keys.right=true; update()');
  assert.ok(h.evaluate('player.x <= worldW-player.w'));
});

test('15. Powtarzane klawisze akcji nie wyzwalają ataku ponownie', () => {
  const h = createHarness(html);
  h.dispatch('keydown', { key: 'z', repeat: true });
  assert.equal(h.evaluate('attackPressed'), false);
  assert.match(inline, /e\.repeat&&\['x','X','z','Z','c','C','Shift'\]/);
});

test('16. Renderowanie nie generuje ponownie poziomu co klatkę', () => {
  const h = createHarness(html);
  h.evaluate('generate=()=>{throw new Error("draw wywołał generator")}; draw()');
  assert.match(inline, /function draw\(\)\{const biome=Math\.floor\(\(level-1\)\/30\)/);
});

test('17. Render 2D nie dubluje modeli 3D przedmiotów, wrogów i portalu', () => {
  assert.match(inline, /if\(!window\.__iskra3dActive\)for\(let a of items\)/);
  assert.match(inline, /if\(!window\.__iskra3dActive\)for\(let a of enemies\)/);
  assert.match(inline, /if\(!window\.__iskra3dActive\)\{ctx\.fillStyle=pal\[2\]/);
});

test('19. Tryb 3D jest domyślny, ale canvas 2D pozostaje widoczny do startu renderera', () => {
  assert.doesNotMatch(html, /id="renderMode"/);
  assert.doesNotMatch(html, /image-rendering:\s*pixelated/i);
  assert.match(html, /#canvasStage #game\{[^}]*opacity:1/);
  assert.match(engine, /fallbackCanvas\.style\.opacity='0'/);
  assert.match(engine, /show2DFallback\('Tryb 3D niedostępny/);
  assert.match(engine, /new T\.WebGLRenderer\(\{canvas, alpha:false, antialias:true/);
  assert.match(engine, /function buildBackdrop\(s,look\)/);
  assert.match(engine, /Every collision platform is represented by a solid 3D block/);
});

test('21. Model 3D Iskry ma wizjer, oczy, rdzeń energii, pancerz i detale kończyn', () => {
  assert.match(engine, /const visor=make\(new T\.SphereGeometry/);
  assert.match(engine, /const eyeL=ball\(/);
  assert.match(engine, /const chestCore=ball\(/);
  assert.match(engine, /const chestRing=make\(new T\.TorusGeometry/);
  assert.match(engine, /const shoulderL=ball\(/);
  assert.match(engine, /const bootGlowL=box\(/);
});

test('22. Animacje wtórne i kryształy otoczenia są aktualizowane w pętli 3D', () => {
  assert.match(engine, /Secondary motion: squash\/stretch, articulated hands\/boots/);
  assert.match(engine, /pupilL\.position\.x=/);
  assert.match(engine, /chestRing\.rotation\.z\+=/);
  assert.match(engine, /crystal\.userData\.floaty=true/);
  assert.match(engine, /if\(o\.userData\.floaty\)\{/);
  assert.match(engine, /o\.position\.y=o\.userData\.baseY\+Math\.sin/);
});

test('23. Platformy 3D mają warstwę trawy dopasowaną do biomu', () => {
  assert.match(engine, /const coverColors=\[/);
  assert.match(engine, /const turfMat=new T\.MeshStandardMaterial/);
  assert.match(engine, /Layered soil\/turf lip makes the platform top read as a surface/);
  assert.match(engine, /const tuftCount=Math\.max\(4,Math\.floor\(p\.w\/22\)\)/);
  assert.match(engine, /userData\.grassSway=true/);
  assert.match(engine, /make\(grassGeo,bladeMat,group\)/);
});

test('24. Dekoracje platform obejmują kwiaty i kamyki bez zmiany kolizji poziomu', () => {
  assert.match(engine, /const flowerMats=\[/);
  assert.match(engine, /const pebbleGeo=new T\.DodecahedronGeometry/);
  assert.match(engine, /s\.biome===1\|\|s\.biome===8/);
  assert.match(engine, /for\(const \[pi,p\] of s\.platforms\.entries\(\)\)/);
  assert.match(engine, /group\.userData\.source=p/);
});

test('20. Fizyka ma szybszą reakcję i wyższy, kontrolowany skok', () => {
  const h = createHarness(html);
  assert.ok(h.evaluate('PHYSICS.every(p => p.speed >= 4.8 && p.accel >= .9 && p.jump >= 12.2)'));
  assert.match(inline, /if\(!keys\.jump&&p\.vy< -4\)p\.vy\*=\.82/);
});

test('18. Strażnik nadal zadaje obrażenia po wcześniejszym trafieniu atakiem', () => {
  const h = createHarness(html);
  h.evaluate('start(30); const boss=enemies.find(e=>e.boss); player.x=boss.x; player.y=boss.y; player.vx=0; player.vy=0; player.inv=0; player.shields=0; player.attackHit=[boss];');
  h.evaluate('update()');
  assert.equal(h.evaluate('lives'), 2);
  assert.match(inline, /if\(!a\.alive\)continue;if\(rect\(p,a\)\)/);
});


test('25. HP zwykłych przeciwników i strażników rośnie wraz z poziomem', () => {
  const h = createHarness(html);
  assert.ok(h.evaluate('generate(360).enemies.find(e=>!e.boss).maxHp') > h.evaluate('generate(1).enemies.find(e=>!e.boss).maxHp'));
  assert.ok(h.evaluate('generate(360).enemies.find(e=>e.boss).maxHp') > h.evaluate('generate(30).enemies.find(e=>e.boss).maxHp'));
});

test('26. Ekwipunek oferuje ostrze, pistolet i laser, a pociski zadają określone obrażenia', () => {
  assert.match(html, /id="weaponBlade"/);
  assert.match(html, /id="weaponPistol"/);
  assert.match(html, /id="weaponLaser"/);
  assert.match(inline, /damage:2,color:'#ffd777'/);
  assert.match(inline, /damage:3,color:'#50f5e4'/);
  assert.match(inline, /damageEnemy\(e,shot\.damage\)/);
});

test('27. Osłona pochłania kontakt z kolcami i innymi pułapkami', () => {
  assert.match(inline, /Osłona pochłonęła pułapkę/);
  assert.match(inline, /if\(rect\(p,h\)&&!p\.inv&&!dashActive/);
  assert.match(engine, /crumbleTopMat/);
  assert.match(engine, /if\(p\.type==='crumble'\)/);
});


test('28. Naciśnięcie ataku tworzy widoczny pocisk z wybranego lasera', () => {
  const h = createHarness(html);
  const result = h.evaluate('start(1); weapon="laser"; attackPressed=true; update(); ({count:projectiles.length,damage:projectiles[0]&&projectiles[0].damage,color:projectiles[0]&&projectiles[0].color})');
  assert.equal(result.count, 1);
  assert.equal(result.damage, 3);
  assert.equal(result.color, '#50f5e4');
  assert.match(engine, /muzzleFlash\.visible=p\.attackTimer>0/);
});

test('29. Pocisk trafiający przeciwnika odejmuje mu określone HP', () => {
  const h = createHarness(html);
  const result = h.evaluate('start(1); const e=enemies.find(e=>e.alive); const before=e.hp; projectiles=[{x:e.x,y:e.y,w:20,h:20,vx:0,damage:3,color:"#50f5e4",life:5}]; update(); ({before,after:e.hp,count:projectiles.length})');
  assert.ok(result.after < result.before);
  assert.equal(result.count, 0);
});

let failed = 0;
for (const { name, fn } of tests) {
  try { fn(); process.stdout.write('PASS ' + name + '\n'); }
  catch (error) { failed++; process.stderr.write('FAIL ' + name + '\n  ' + (error.stack || error.message) + '\n'); }
}
process.stdout.write('\nWynik: ' + (tests.length - failed) + '/' + tests.length + ' testów zaliczonych.\n');
if (failed) process.exitCode = 1;

test('30. Każda kraina ma gradient atmosferyczny, własne dekoracje i ruchome efekty', () => {
  assert.match(engine, /new T\.ShaderMaterial\(/);
  assert.match(engine, /function randSeed\(n\)/);
  assert.match(engine, /if\(s\.biome===0\)/);
  assert.match(engine, /else if\(s\.biome===1\|\|s\.biome===8\)/);
  assert.match(engine, /else if\(s\.biome===2\)/);
  assert.match(engine, /else if\(s\.biome===3\)/);
  assert.match(engine, /else if\(s\.biome===4\|\|s\.biome===9\)/);
  assert.match(engine, /else if\(s\.biome===6\)/);
  assert.match(engine, /else if\(s\.biome===7\)/);
  assert.match(engine, /else if\(s\.biome===10\)/);
  assert.match(engine, /userData\.atmosphere=true/);
  assert.match(engine, /if\(o\.userData\.cloudDrift\)/);
});
