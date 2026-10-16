/* ISKRA 360 — animowany renderer 3D. Wymaga Three.js; przy braku WebGL gra 2D pozostaje dostępna. */
(() => {
  const canvas = document.getElementById('game3d');
  const stage = document.getElementById('canvasStage');
  const stageStatus = document.getElementById('canvasStage');
  if (!canvas || !window.THREE || !window.__iskra3dState) {
    if (stageStatus) {
      stageStatus.style.background = '#071329';
      const note = document.createElement('div');
      note.textContent = 'Tryb 3D wymaga WebGL i połączenia z biblioteką Three.js.';
      note.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;padding:28px;text-align:center;color:#e1ffff;font:700 18px/1.5 system-ui;background:radial-gradient(ellipse at 50% 30%,#163d59,#071329 75%);';
      stageStatus.appendChild(note);
    }
    return;
  }
  const T = window.THREE;
  let renderer;
  try { renderer = new T.WebGLRenderer({canvas, alpha:false, antialias:true, powerPreference:'high-performance'}); }
  catch (error) {
    if (stageStatus) {
      const note = document.createElement('div');
      note.textContent = 'Nie udało się uruchomić grafiki 3D. Włącz akcelerację sprzętową/WebGL w przeglądarce.';
      note.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;padding:28px;text-align:center;color:#e1ffff;font:700 18px/1.5 system-ui;background:radial-gradient(ellipse at 50% 30%,#163d59,#071329 75%);';
      stageStatus.appendChild(note);
    }
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(960, 540, false);
  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-480,480,270,-270,.1,2500);
  camera.position.set(480,270,900);
  scene.add(new T.HemisphereLight(0xb5f6ff,0x17152f,2.2));
  const sun = new T.DirectionalLight(0xe4ffff,2.6); sun.position.set(-200,500,500); scene.add(sun);
  const rim = new T.PointLight(0x7a38ff,220,900); rim.position.set(650,400,150); scene.add(rim);
  const world = new T.Group(); scene.add(world);
  const M = (c,e=c,i=.2,m=.35,r=.32) => new T.MeshStandardMaterial({color:c,emissive:e,emissiveIntensity:i,metalness:m,roughness:r});
  const cyan=M('#43f6e4','#00e8d5',1.8,.7,.2), white=M('#e1ffff','#72fff1',.7,.25,.2),
    gold=M('#ffd777','#ff9b27',1.3,.5,.23), dark=M('#0b344d','#062538',.5,.7,.3),
    blue=M('#147e96','#00cde0',.9,.7,.24), purple=M('#9a5bff','#702aff',1.4,.4,.3),
    pink=M('#ff527d','#ff164f',1.6,.4,.25), ice=M('#a8efff','#42c9ff',.9,.3,.18),
    stone=M('#263c59','#10233d',.35,.6,.4), green=M('#55dc99','#00d875',.8,.3,.3);
  const make=(geo,mat,parent=world)=>{const o=new T.Mesh(geo,mat);parent.add(o);return o;};
  const box=(x,y,z,w,h,d,mat,parent=world)=>{const o=make(new T.BoxGeometry(w,h,d),mat,parent);o.position.set(x,y,z);return o;};
  const ball=(x,y,z,r,mat,parent=world)=>{const o=make(new T.SphereGeometry(r,18,12),mat,parent);o.position.set(x,y,z);return o;};
  function limb(parent,material,len,width){const p=new T.Group();parent.add(p);box(0,-len/2,0,width,len,width,material,p);ball(0,-len,0,width*.55,material,p);return p;}
  const hero=new T.Group();world.add(hero);
  const torso=new T.Group();hero.add(torso);
  box(0,0,0,22,23,13,cyan,torso); box(0,3,7,15,7,2,white,torso);
  box(0,-7,7,9,5,2,gold,torso); box(-7,1,6,3,13,2,blue,torso);box(7,1,6,3,13,2,blue,torso);
  const head=new T.Group();head.position.set(0,15,0);torso.add(head);
  const helmet=ball(0,0,0,10,blue,head);helmet.scale.set(1.05,.88,.8);
  box(0,-1,7,14,5,2,dark,head);box(3,0,8.5,5,2,1,white,head);ball(-1,-6,0,2,gold,head);
  const antenna=limb(head,white,8,1.3);antenna.position.set(0,8,0);ball(0,8,0,2.4,gold,head);
  // Layered faceplate, optical lenses and cheek armour make the hero readable at game scale.
  const visor=make(new T.SphereGeometry(1,24,16),M('#071b30','#06243c',.55,.85,.12),head);visor.scale.set(7.6,3.5,1.9);visor.position.set(0,-1,7.2);
  const eyeL=ball(-3.1,-.4,9.1,1.45,white,head),eyeR=ball(3.1,-.4,9.1,1.45,white,head);
  const pupilL=ball(-2.8,-.6,10.2,.62,cyan,head),pupilR=ball(3.4,-.6,10.2,.62,cyan,head);
  const cheekL=box(-7,-4,7.8,3.2,3.8,2.3,purple,head),cheekR=box(7,-4,7.8,3.2,3.8,2.3,purple,head);
  const crest=make(new T.ConeGeometry(3,7,5),gold,head);crest.position.set(0,8,0);crest.rotation.z=.08;
  const chestCore=ball(0,1,9,3.7,white,torso);chestCore.material=M('#e1ffff','#43f6e4',2.8,.5,.14);
  const chestRing=make(new T.TorusGeometry(5.2,.8,8,28),gold,torso);chestRing.position.set(0,1,9);chestRing.rotation.x=.15;
  const shoulderL=ball(-13,5,0,5,blue,torso),shoulderR=ball(13,5,0,5,blue,torso);
  const armL=limb(torso,blue,12,4),armR=limb(torso,blue,12,4),legL=limb(torso,dark,11,5),legR=limb(torso,dark,11,5);
  const handL=ball(-13,-8,0,4.2,ice,torso),handR=ball(13,-8,0,4.2,ice,torso);
  const bootL=box(-6,-22,2,10,5,12,purple,torso),bootR=box(6,-22,2,10,5,12,purple,torso);
  const bootGlowL=box(-6,-20,8,6,1.3,2,cyan,torso),bootGlowR=box(6,-20,8,6,1.3,2,cyan,torso);
  armL.position.set(-13,4,0);armR.position.set(13,4,0);legL.position.set(-6,-11,0);legR.position.set(6,-11,0);
  box(0,0,-8,12,15,7,dark,torso);box(0,4,-12,6,6,2,purple,torso);
  const aura=ball(0,0,-8,17, new T.MeshBasicMaterial({color:0x43f6e4,transparent:true,opacity:.11}));aura.scale.set(1.8,1.8,.3);
  const heldWeapon=new T.Group();torso.add(heldWeapon);heldWeapon.position.set(15,-7,9);
  const sword=box(4,-1,0,3,22,3,gold,heldWeapon);sword.rotation.z=-.42;box(4,-9,0,8,3,4,blue,heldWeapon).rotation.z=-.42;
  const pistol=box(3,-1,0,10,5,5,dark,heldWeapon);box(8,0,0,5,2,3,gold,heldWeapon);
  const laserGun=box(3,-1,0,12,6,5,cyan,heldWeapon);box(10,-1,0,7,3,3,white,heldWeapon);
  let projectileMeshes=[];
  const biomeColors=[0x50f5e4,0x8df6a8,0xffd777,0xb4e7ff,0xfa78f5,0xffb66d,0xe0faff,0xff7d51,0xd0ff93,0x9c9dff,0xff77d9,0xfff2a8];
  let built=-1, objects=[], enemies=[], platformMeshes=[], hazardMeshes=[], portal, portalCore, active=true;
  const biomeLooks=[
    {sky:0x071329,far:0x102c49,near:0x173c56,rock:0x20506b,top:0x50f5e4,glow:0x0bb6c4},
    {sky:0x09251f,far:0x174c3c,near:0x236b4c,rock:0x2b7654,top:0x8df6a8,glow:0x31d88b},
    {sky:0x21162c,far:0x58364c,near:0x85513f,rock:0x9a6149,top:0xffd777,glow:0xf4a84b},
    {sky:0x101e3b,far:0x243e68,near:0x3e6090,rock:0x567eaa,top:0xb4e7ff,glow:0x52c7ff},
    {sky:0x160e35,far:0x33205f,near:0x4b2384,rock:0x5934a0,top:0xfa78f5,glow:0x9a5bff},
    {sky:0x211c2c,far:0x40384d,near:0x5e5268,rock:0x746577,top:0xffb66d,glow:0xdf8b54},
    {sky:0x102c43,far:0x214e6a,near:0x326a83,rock:0x4a849b,top:0xe0faff,glow:0x6edcff},
    {sky:0x35181b,far:0x612728,near:0x7f302e,rock:0xa34436,top:0xff7d51,glow:0xff452b},
    {sky:0x172b26,far:0x2c5748,near:0x3b765e,rock:0x528b6b,top:0xd0ff93,glow:0x83e76a},
    {sky:0x16152d,far:0x302f59,near:0x3f3b6f,rock:0x514e89,top:0x9c9dff,glow:0x656bff},
    {sky:0x260d32,far:0x4f1d5c,near:0x772e7c,rock:0x963b8d,top:0xff77d9,glow:0xe644be},
    {sky:0x061c2d,far:0x104657,near:0x176878,rock:0x238b96,top:0xfff2a8,glow:0x50f5e4}
  ];
  function clear(){
    const shared=[cyan,white,gold,dark,blue,purple,pink,ice,stone,green];
    for(const g of enemies)world.remove(g);
    for(const o of objects){
      o.parent?.remove(o);
      const geometries=new Set(),materials=new Set();
      o.traverse?.(child=>{if(child.geometry)geometries.add(child.geometry);if(child.material){for(const mat of (Array.isArray(child.material)?child.material:[child.material]))if(!shared.includes(mat))materials.add(mat);}});
      if(o.geometry)geometries.add(o.geometry);
      if(o.material)for(const mat of (Array.isArray(o.material)?o.material:[o.material]))if(!shared.includes(mat))materials.add(mat);
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
    }
    objects=[];enemies=[];platformMeshes=[];hazardMeshes=[];portal=null;portalCore=null;
  }
  function add(o){objects.push(o);return o;}
  function buildBackdrop(s,look){
    scene.background=new T.Color(look.sky);
    const backMat=new T.MeshBasicMaterial({color:look.sky});
    add(box(s.worldW/2,270,-180,s.worldW+1600,1000,12,backMat));
    const makeRidge=(z,base,peak,color,seed)=>{
      const shape=new T.Shape();shape.moveTo(0,0);shape.lineTo(0,base);
      let r=(seed>>>0)||1,x=0;while(x<s.worldW+300){r=(r*1664525+1013904223)>>>0;const step=100+(r%170);r=(r*1664525+1013904223)>>>0;shape.lineTo(x+step*.45,base+((r/4294967296)*peak));shape.lineTo(x+step,base);x+=step;}
      shape.lineTo(s.worldW+500,0);shape.closePath();
      const mesh=make(new T.ShapeGeometry(shape),new T.MeshBasicMaterial({color,transparent:true,opacity:.88,side:T.DoubleSide}));mesh.position.set(-100,0,z);add(mesh);
    };
    makeRidge(-125,60,150,look.far,s.level*13+7);
    makeRidge(-95,25,100,look.near,s.level*31+19);
    // Distant 3D towers and luminous windows give every biome its own silhouette.
    let seed=(s.level*7919+31)>>>0;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<Math.ceil(s.worldW/145);i++){
      const x=i*145+rand()*80, h=45+rand()*135, w=24+rand()*42;
      const mat=new T.MeshStandardMaterial({color:look.rock,emissive:look.glow,emissiveIntensity:.12,metalness:.25,roughness:.8});
      const tower=add(box(x,40+h/2,-65,w,h,28,mat));
      tower.rotation.z=(rand()-.5)*.08;
      if(i%2===0){const windowMat=new T.MeshBasicMaterial({color:look.top});add(box(x,40+h*.55,-48,3,Math.max(8,h*.22),2,windowMat));}
    }
    // Distinct silhouettes make each realm recognizable while the camera scrolls past them.
    const landmarkMat=new T.MeshStandardMaterial({color:look.rock,emissive:look.glow,emissiveIntensity:.22,roughness:.78,metalness:.18});
    const glowMat=new T.MeshBasicMaterial({color:look.top,transparent:true,opacity:.72});
    for(let i=0;i<Math.ceil(s.worldW/360);i++){
      const x=160+i*360+rand()*110,base=42+rand()*24;
      if(s.biome===1||s.biome===8){add(box(x,base+45,-72,12,90,12,landmarkMat));const crown=add(make(new T.ConeGeometry(32,75,6),landmarkMat));crown.position.set(x,base+100,-72);crown.userData.floaty=true;crown.userData.baseY=base+100;crown.userData.phase=rand()*6;crown.userData.spin=.001;}
      else if(s.biome===2){add(box(x,base+36,-72,13,72,10,green));add(box(x-12,base+35,-72,12,25,9,green));add(box(x+12,base+48,-72,12,22,9,green));}
      else if(s.biome===3){const spire=add(make(new T.ConeGeometry(27,100+rand()*60,5),ice));spire.position.set(x,base+55,-70);}
      else if(s.biome===7){const volcano=add(make(new T.ConeGeometry(58,115,7),landmarkMat));volcano.position.set(x,base+55,-70);add(ball(x,base+105,-66,9,glowMat));}
      else if(s.biome===9||s.biome===4||s.biome===11){const ring=add(make(new T.TorusGeometry(30+rand()*14,3,7,24),glowMat));ring.position.set(x,base+80,-65);ring.rotation.x=.35;ring.userData.floaty=true;ring.userData.baseY=base+80;ring.userData.phase=rand()*6;ring.userData.spin=.008;}
      else if(s.biome===5){const wreck=add(box(x,base+35,-70,60,55,15,landmarkMat));wreck.rotation.z=(rand()-.5)*.4;add(box(x,base+62,-62,20,5,3,glowMat));}
      else {const arch=add(make(new T.TorusGeometry(28,5,7,20),landmarkMat));arch.position.set(x,base+72,-72);arch.rotation.x=Math.PI/2;add(box(x,base+20,-72,9,45,10,landmarkMat));}
    }
    for(let i=0;i<70;i++){const x=rand()*s.worldW,y=140+rand()*370;const star=add(box(x,y,-45,1+rand()*2,1+rand()*2,1,new T.MeshBasicMaterial({color:i%4===0?look.top:0xc4dcff,transparent:true,opacity:.25+rand()*.55})));star.userData.star=true;star.userData.phase=rand()*6;}
    // Floating crystal clusters add parallax-like depth and an animated silhouette per world.
    for(let i=0;i<Math.ceil(s.worldW/230);i++){
      const x=70+i*230+rand()*75,y=90+rand()*285,z=-18-rand()*22,size=5+rand()*9;
      const crystal=add(make(new T.OctahedronGeometry(size,1),new T.MeshStandardMaterial({color:look.top,emissive:look.glow,emissiveIntensity:.8,metalness:.55,roughness:.2,transparent:true,opacity:.82})));
      crystal.position.set(x,y,z);crystal.rotation.set(rand()*2,rand()*2,rand()*2);
      crystal.userData.floaty=true;crystal.userData.baseY=y;crystal.userData.phase=rand()*Math.PI*2;crystal.userData.spin=.004+rand()*.009;
      const shardGlow=add(ball(x,y,z+3,size*.45,new T.MeshBasicMaterial({color:look.top,transparent:true,opacity:.18})));
      shardGlow.userData.floaty=true;shardGlow.userData.baseY=y;shardGlow.userData.phase=crystal.userData.phase+.7;shardGlow.userData.spin=-.006;
    }
  }
  function build(s){
    clear();
    const look=biomeLooks[s.biome]||biomeLooks[0];buildBackdrop(s,look);
    const bodyMat=M('#243b57','#091727',.25,.55,.48);
    const topMat=M('#'+look.top.toString(16).padStart(6,'0'),'#'+look.glow.toString(16).padStart(6,'0'),.9,.45,.28);
    const sideMat=M('#'+look.rock.toString(16).padStart(6,'0'),'#'+look.glow.toString(16).padStart(6,'0'),.3,.35,.42);
    const movingMat=M('#32617a','#0d8193',.7,.65,.24);
    const crumbleMat=M('#5b3a61','#c22b7d',.9,.45,.32);const crumbleTopMat=M('#ff679b','#ff174f',1.8,.3,.24);const crackMat=M('#ffb0d0','#ff174f',1.5,.25,.3);
    // Biome-tinted ground cover: turf in gardens, moss in ancient worlds, frost in icy worlds.
    const coverColors=[0x5edb9a,0x63e779,0xd7b66a,0xc3f5ff,0xb5f46e,0x9ab69a,0x8ee9ed,0xf18b53,0x8bf17c,0x9da5d8,0xda8bdd,0x67e9bf];
    const cover=coverColors[s.biome]||0x5edb9a;
    const turfMat=new T.MeshStandardMaterial({color:cover,emissive:cover,emissiveIntensity:.28,roughness:.86,metalness:.02});
    const bladeMat=new T.MeshStandardMaterial({color:cover,emissive:cover,emissiveIntensity:.42,roughness:.72,side:T.DoubleSide});
    const flowerMats=[M('#ffe7a1','#ffc04d',.8,.05,.3),M('#ff9fda','#e94aa9',.8,.05,.3),M('#d8f6ff','#75cfff',.8,.05,.3)];
    const pebbleMat=M('#9ab6a9','#477e77',.12,.08,.92);
    const grassGeo=new T.ConeGeometry(2.1,9,4);
    const pebbleGeo=new T.DodecahedronGeometry(2.4,0);
    // Every collision platform is represented by a solid 3D block with a lit edge.
    for(const [pi,p] of s.platforms.entries()){
      const group=new T.Group();world.add(group);group.position.set(p.x+p.w/2,540-p.y-p.h/2,0);group.userData.source=p;add(group);platformMeshes.push(group);
      const material=p.type==='moving'?movingMat:p.type==='crumble'?crumbleMat:bodyMat;
      box(0,0,0,p.w,p.h,38,material,group);
      box(0,p.h/2-2,21,p.w,4,5,p.type==='crumble'?crumbleTopMat:p.type==='moving'?ice:topMat,group);
      if(p.type==='crumble'){for(let ci=0;ci<4;ci++){const crack=box(-p.w*.32+ci*p.w*.2,p.h/2+1.1,25,Math.max(8,p.w*.14),1.5,1.2,crackMat,group);crack.rotation.z=ci%2===0?.48:-.62;}for(const edge of [-1,1]){const warning=box(edge*(p.w/2-3),0,22,3,p.h+3,3,pink,group);warning.material=crackMat;}}
      box(0,-p.h/2+2,20,p.w-8,2,3,sideMat,group);
      // Layered soil/turf lip makes the platform top read as a surface, not a bare cube.
      box(0,p.h/2+0.6,20,p.w-2,2.2,8,turfMat,group);
      box(-p.w*.28,p.h/2-5,20,Math.max(8,p.w*.12),2.5,3,sideMat,group);
      box(p.w*.31,p.h/2-8,20,Math.max(7,p.w*.09),2,3,sideMat,group);
      for(let j=-1;j<=1;j++){if(p.w>100)box(j*p.w*.27,0,20,2,p.h-5,1,sideMat,group);}
      // Deterministic grass tufts, scattered pebbles and occasional biome flowers.
      const tuftCount=Math.max(2,Math.floor(p.w/43));
      for(let gi=0;gi<tuftCount;gi++){
        const gx=-p.w*.43+(gi+.5)*(p.w*.86/tuftCount);
        const hash=((Math.floor(p.x+31)*17+gi*37+pi*13)>>>0);
        if(hash%5===0&&tuftCount>2)continue;
        const h1=5+(hash%7),h2=4+((hash>>>3)%6);
        const blade1=make(grassGeo,bladeMat,group);blade1.scale.set(.72,h1/9,.72);blade1.position.set(gx,p.h/2+1+h1/2,24);blade1.rotation.z=((hash%9)-4)*.07;
        const blade2=make(grassGeo,bladeMat,group);blade2.scale.set(.62,h2/9,.62);blade2.position.set(gx+3,p.h/2+1+h2/2,24.5);blade2.rotation.z=-.18;
        if((s.biome===1||s.biome===8||s.biome===0||s.biome===11)&&hash%3===0){
          const fm=flowerMats[(hash>>>4)%flowerMats.length];
          const stem=box(gx+5,p.h/2+3.5,24,1,6,1,green,group);
          const bloom=make(new T.SphereGeometry(2.6,8,6),fm,group);bloom.position.set(gx+5,p.h/2+7,25);
          const petal=make(new T.SphereGeometry(1.5,7,5),white,group);petal.position.set(gx+5,p.h/2+7,27);
        }
        if(hash%4===0){
          const pebble=make(pebbleGeo,pebbleMat,group);pebble.position.set(gx-4,p.h/2+2,24);pebble.scale.set(1.4,.6,.8);pebble.rotation.y=(hash%7)*.3;
        }
      }
      if(p.type==='moving'){const rail=box(0,-p.h/2-8,-4,p.w+12,2,6,sideMat,group);rail.userData.rail=true;}
    }
    for(const h of s.hazards){
      const group=new T.Group();world.add(group);group.position.set(h.x+h.w/2,540-h.y-h.h/2,29);group.userData.source=h;add(group);hazardMeshes.push(group);
      if(h.type==='spike'){
        const count=Math.max(2,Math.floor(h.w/12));for(let i=0;i<count;i++){const spike=make(new T.ConeGeometry(7,Math.max(18,h.h*1.7),5),pink,group);spike.position.set((i-(count-1)/2)*12,1,0);const base=box(spike.position.x,-h.h*.25,0,10,5,7,dark,group);base.userData.detail=true;}
        box(0,-h.h*.5,1,h.w,3,8,pink,group);
      }else if(h.type==='laser'){
        const beam=box(0,0,0,h.w,Math.max(4,h.h),7,pink,group);beam.material=M('#ff527d','#ff164f',2.6,.1,.18);
        box(0,0,-4,h.w+10,2,2,white,group);
        for(const side of [-1,1])box(side*h.w*.52,0,0,5,18,8,gold,group);
      }else if(h.type==='lava'){
        const lavaMat=M('#ff572f','#ff2b16',2.2,.15,.24);box(0,0,0,h.w,Math.max(10,h.h),24,lavaMat,group);
        for(let i=0;i<Math.max(2,Math.floor(h.w/24));i++){const bubble=ball((i-(Math.floor(h.w/24)-1)/2)*20,3,14,3,gold,group);bubble.userData.phase=i*.8;}
      }else if(h.type==='wind'){
        const windMat=new T.MeshBasicMaterial({color:look.top,transparent:true,opacity:.22,wireframe:true});
        const ring=make(new T.TorusGeometry(Math.min(h.w,h.h)*.34,2,5,24),windMat,group);ring.rotation.x=Math.PI/2;
        box(0,0,-2,h.w,h.h,2,new T.MeshBasicMaterial({color:look.glow,transparent:true,opacity:.08}),group);
      }
    }
    if(s.checkpoint){
      const beacon=add(new T.Group());beacon.position.set(s.checkpoint.x+s.checkpoint.w/2,540-s.checkpoint.y-s.checkpoint.h/2,25);beacon.userData.source=s.checkpoint;
      const pole=box(0,0,0,5,s.checkpoint.h,6,white,beacon);const flag=make(new T.ConeGeometry(9,17,4),gold,beacon);flag.position.set(7,8,0);flag.rotation.z=-Math.PI/2;
      const glow=ball(0,0,5,12,cyan,beacon);glow.material=new T.MeshBasicMaterial({color:look.top,transparent:true,opacity:.22});glow.scale.set(1.1,2,.3);
    }
    for(const item of s.items){const o=add(ball(item.x,540-item.y,24,item.type==='key'?8:7,item.type==='key'?purple:gold));o.userData.source=item;o.userData.phase=item.x*.03;}

    for(const e of s.enemies){
      const g=new T.Group();world.add(g);g.position.set(e.x+e.w/2,540-e.y-e.h/2,32);
      const b=make(e.boss?new T.IcosahedronGeometry(e.w*.53,2):new T.SphereGeometry(e.w*.48,18,12),e.boss?pink:purple,g);b.scale.y=e.boss?1.05:.82;
      for(const side of [-1,1]){box(side*e.w*.17,2,e.w*.36,e.boss?8:5,e.boss?6:4,3,white,g);ball(side*e.w*.17,2,e.w*.36+2,1.5,dark,g);}
      if(e.boss)for(let i=0;i<5;i++){const sp=make(new T.ConeGeometry(5,15,5),gold,g);sp.position.set((i-2)*10,e.h*.4,0);sp.rotation.z=Math.PI;}
      g.userData.source=e;g.userData.phase=e.x*.04;g.userData.boss=!!e.boss;enemies.push(g);
    }
    if(s.portal){portal=add(make(new T.TorusGeometry(23,4,12,36),new T.MeshStandardMaterial({color:biomeColors[s.biome],emissive:biomeColors[s.biome],emissiveIntensity:2,metalness:.5,roughness:.2})));portal.position.set(s.portal.x+s.portal.w/2,540-s.portal.y-s.portal.h/2,30);portalCore=add(ball(portal.position.x,portal.position.y,30,10,white));}
    built=s.level;
  }
  function resize(){renderer.setSize(stage.clientWidth||960,stage.clientHeight||540,false);camera.updateProjectionMatrix();}
  if(window.ResizeObserver)new ResizeObserver(resize).observe(stage);else window.addEventListener('resize',resize);resize();
  function frame(){
    requestAnimationFrame(frame);if(!active)return;
    const s=window.__iskra3dState();if(!s)return;if(s.level!==built)build(s);
    camera.position.x=s.cam+480;camera.lookAt(s.cam+480,270,0);rim.color.setHex(biomeColors[s.biome]||0x50f5e4);sun.color.setHex(biomeColors[s.biome]||0x50f5e4);
    const p=s.player, walk=Math.sin(p.anim||0);
    sword.visible=s.weapon==='blade';pistol.visible=s.weapon==='pistol';laserGun.visible=s.weapon==='laser';heldWeapon.position.x=p.facing>0?15:-15;heldWeapon.scale.x=p.facing>0?1:-1;
    while(projectileMeshes.length<(s.projectiles||[]).length){const mesh=box(0,0,0,16,5,5,cyan);projectileMeshes.push(mesh);}
    while(projectileMeshes.length>(s.projectiles||[]).length){const mesh=projectileMeshes.pop();world.remove(mesh);mesh.geometry.dispose();}
    (s.projectiles||[]).forEach((shot,i)=>{const mesh=projectileMeshes[i];mesh.visible=true;mesh.position.set(shot.x+shot.w/2,540-shot.y-shot.h/2,42);mesh.scale.x=shot.w/16;mesh.material.color.set(shot.color||'#50f5e4');mesh.material.emissive?.set(shot.color||'#50f5e4');});
    hero.position.set(p.x+p.w/2,540-p.y-p.h/2,38);
    hero.rotation.z=p.dash>0?-p.facing*.13:Math.max(-.14,Math.min(.14,-p.vx*.025));
    torso.scale.set(1+(p.dash>0?.16:0),p.dash>0?.82:(!p.grounded?1.05:1),1);
    head.rotation.z=Math.sin(s.tick*.045)*.06;armL.rotation.z=p.grounded?walk*.55:-.6;armR.rotation.z=p.grounded?-walk*.55:.6;
    legL.rotation.z=p.grounded?-walk*.48:.2;legR.rotation.z=p.grounded?walk*.48:-.2;antenna.rotation.z=Math.sin(s.tick*.12)*.13;
    // Secondary motion: squash/stretch, articulated hands/boots, eye focus and pulsing energy core.
    head.rotation.x=p.vx*.012;eyeL.position.y=eyeR.position.y=-.4+Math.sin(s.tick*.08)*.12;
    pupilL.position.x=-2.8+Math.max(-.35,Math.min(.35,p.vx*.08));pupilR.position.x=3.4+Math.max(-.35,Math.min(.35,p.vx*.08));
    shoulderL.rotation.z=Math.sin(s.tick*.1)*.08;shoulderR.rotation.z=-Math.sin(s.tick*.1)*.08;
    handL.position.y=-8+(p.grounded?Math.max(0,walk)*1.5:0);handR.position.y=-8+(p.grounded?Math.max(0,-walk)*1.5:0);
    bootL.rotation.z=legL.rotation.z*.7;bootR.rotation.z=legR.rotation.z*.7;
    chestCore.scale.setScalar(1+Math.sin(s.tick*.16)*.12+(p.dash>0?.35:0));chestRing.rotation.z+=.025+(p.dash>0?.06:0);
    bootGlowL.material.emissiveIntensity=bootGlowR.material.emissiveIntensity=p.dash>0?2.5:.6;
    aura.position.copy(hero.position);aura.material.opacity=p.dash>0?.28:.11;aura.scale.setScalar(p.dash>0?2.5:1.8);
    for(const o of objects){if(o.userData.floaty){o.position.y=o.userData.baseY+Math.sin(s.tick*.035+o.userData.phase)*7;o.rotation.y+=o.userData.spin||.005;o.rotation.z+=(o.userData.spin||.005)*.7;}const a=o.userData.source;if(a){if(a.got||a.alive===false)o.visible=false;if(a.type==='laser')o.visible=!!a.active;if(a.type==='moving'&&a.baseY!==undefined){o.position.y=540-(a.y??a.baseY)-a.h/2;o.position.x=(a.x??o.position.x-a.w/2)+a.w/2;}if(a.type==='coin'||a.type==='key'){o.rotation.y+=.06;o.position.x=a.x;o.position.y=540-(a.y??a.baseY??0)+Math.sin(s.tick*.08+(o.userData.phase||0))*3;}}}
    for(const g of platformMeshes){const p=g.userData.source;g.position.x=p.x+p.w/2;g.position.y=540-p.y-p.h/2;g.visible=!(p.crumbleGone>0);if(p.type==='crumble'){g.children.forEach(child=>{if(child.material===crackMat)child.material.emissiveIntensity=.8+Math.sin(s.tick*.22)*.8;});}}
    for(const g of hazardMeshes){const h=g.userData.source;g.position.x=h.x+h.w/2;g.position.y=540-h.y-h.h/2;g.visible=h.type!=='laser'||!!h.active;g.rotation.z=h.type==='wind'?Math.sin(s.tick*.04+h.phase)*.08:0;g.traverse(child=>{if(child.geometry&&child.geometry.type==='SphereGeometry'&&child.userData.phase!==undefined)child.position.y=Math.sin(s.tick*.1+child.userData.phase)*3;});}
    for(const g of enemies){const e=g.userData.source;g.position.x=e.x+e.w/2;g.position.y=540-e.y-e.h/2;g.rotation.y=Math.sin(s.tick*.06+g.userData.phase)*.13;g.scale.y=1+Math.sin(s.tick*.15+g.userData.phase)*.035;g.visible=e.alive;}
    if(portal){portal.rotation.z+=.018;portal.scale.setScalar(1+Math.sin(s.tick*.08)*.08);portalCore.rotation.y+=.04;portalCore.scale.setScalar(1+Math.sin(s.tick*.1)*.14);}
    renderer.render(scene,camera);
  }
  window.__iskra3dActive=true;frame();
})();
