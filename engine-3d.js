/* ISKRA 360 — animowany renderer 3D. Wymaga Three.js; przy braku WebGL gra 2D pozostaje dostępna. */
(() => {
  const canvas = document.getElementById('game3d');
  const stage = document.getElementById('canvasStage');
  const button = document.getElementById('renderMode');
  if (!canvas || !window.THREE || !window.__iskra3dState) {
    if (button) button.textContent = '3D: NIEDOSTĘPNE';
    return;
  }
  const T = window.THREE;
  const renderer = new T.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(960, 540, false);
  const scene = new T.Scene();
  // Brak mgły i tła 3D: scena jest przezroczystą nakładką na platformówkę 2D.
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
  const armL=limb(torso,blue,12,4),armR=limb(torso,blue,12,4),legL=limb(torso,dark,11,5),legR=limb(torso,dark,11,5);
  armL.position.set(-13,4,0);armR.position.set(13,4,0);legL.position.set(-6,-11,0);legR.position.set(6,-11,0);
  box(0,0,-8,12,15,7,dark,torso);box(0,4,-12,6,6,2,purple,torso);
  const aura=ball(0,0,-8,17, new T.MeshBasicMaterial({color:0x43f6e4,transparent:true,opacity:.11}));aura.scale.set(1.8,1.8,.3);
  const biomeColors=[0x50f5e4,0x8df6a8,0xffd777,0xb4e7ff,0xfa78f5,0xffb66d,0xe0faff,0xff7d51,0xd0ff93,0x9c9dff,0xff77d9,0xfff2a8];
  let built=-1, objects=[], enemies=[], portal, portalCore, active=true;
  function clear(){for(const g of enemies)world.remove(g);for(const o of objects){world.remove(o);if(o.geometry)o.geometry.dispose();if(o.material && ![cyan,white,gold,dark,blue,purple,pink,ice,stone,green].includes(o.material))o.material.dispose();}objects=[];enemies=[];portal=null;portalCore=null;}
  function add(o){objects.push(o);return o;}
  function build(s){
    clear();
    // Platformy, tła i pułapki pozostają rysowane przez oryginalny renderer 2D.\n    for(const item of s.items){const o=add(ball(item.x,540-item.y,24,item.type==='key'?7:6,item.type==='key'?purple:gold));o.userData.source=item;o.userData.phase=item.x*.03;}
    // Nie budujemy przestrzennego świata ani geometrii planszy — tylko modele obiektów gry.\n    for(const e of s.enemies){
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
    camera.position.x=s.cam+480;camera.lookAt(s.cam+480,270,0);rim.color.setHex(biomeColors[s.biome]||0x50f5e4);
    const p=s.player, walk=Math.sin(p.anim||0);
    hero.position.set(p.x+p.w/2,540-p.y-p.h/2,38);
    hero.rotation.z=p.dash>0?-p.facing*.13:Math.max(-.14,Math.min(.14,-p.vx*.025));
    torso.scale.set(1+(p.dash>0?.16:0),p.dash>0?.82:(!p.grounded?1.05:1),1);
    head.rotation.z=Math.sin(s.tick*.045)*.06;armL.rotation.z=p.grounded?walk*.55:-.6;armR.rotation.z=p.grounded?-walk*.55:.6;
    legL.rotation.z=p.grounded?-walk*.48:.2;legR.rotation.z=p.grounded?walk*.48:-.2;antenna.rotation.z=Math.sin(s.tick*.12)*.13;
    aura.position.copy(hero.position);aura.material.opacity=p.dash>0?.28:.11;aura.scale.setScalar(p.dash>0?2.5:1.8);
    for(const o of objects){const a=o.userData.source;if(a){if(a.got||a.alive===false)o.visible=false;if(a.type==='laser')o.visible=!!a.active;if(a.type==='moving'&&a.baseY!==undefined)o.position.y=540-(a.y??a.baseY)-a.h/2;if(a.type==='coin'||a.type==='key'){o.rotation.y+=.06;o.position.y+=Math.sin(s.tick*.08+(o.userData.phase||0))*.22;}}}
    for(const g of enemies){const e=g.userData.source;g.position.x=e.x+e.w/2;g.position.y=540-e.y-e.h/2;g.rotation.y=Math.sin(s.tick*.06+g.userData.phase)*.13;g.scale.y=1+Math.sin(s.tick*.15+g.userData.phase)*.035;g.visible=e.alive;}
    if(portal){portal.rotation.z+=.018;portal.scale.setScalar(1+Math.sin(s.tick*.08)*.08);portalCore.rotation.y+=.04;portalCore.scale.setScalar(1+Math.sin(s.tick*.1)*.14);}
    renderer.render(scene,camera);
  }
  button.onclick=()=>{active=!active;window.__iskra3dActive=active;button.textContent='Modele 3D: '+(active?'ON':'OFF');};
  window.__iskra3dActive=true;button.textContent='Modele 3D: ON';frame();
})();
