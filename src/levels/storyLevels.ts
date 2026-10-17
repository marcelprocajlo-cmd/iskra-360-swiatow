import type{LevelData,PlatformData,WorldData}from'./schema';
const titles=[[["Przebudzenie Latarni","The Beacon Wakes"],["Zardzewiały Most","The Rusted Bridge"],["Rytm Zębatych Serc","Rhythm of Clockwork Hearts"],["Ogród Pod Maszyną","The Garden Under the Machine"],["Strażnik Bez Świtu","Warden Without Dawn"]],[["Ścieżka Szeptów","Path of Whispers"],["Korzenie Pamięci","Roots of Memory"],["Taniec Świetlików","Firefly Dance"],["Dzwony Starego Drzewa","Bells of the Old Tree"],["Matka Cierni","Thorn Mother"]],[["Wydmy Odbić","Dunes of Reflection"],["Szklany Kanion","The Glass Ravine"],["Kroki Południa","Footsteps of Noon"],["Studnia Drugiego Słońca","Well of the Second Sun"],["Król Bez Twarzy","The Faceless King"]],[["Szczelina Ciszy","The Silence Rift"],["Dryfujące Ogrody","Drifting Gardens"],["Orbitujący Pył","Orbiting Dust"],["Serce Lodowca","Heart of the Glacier"],["Astronom Mrozu","The Frost Astronomer"]]] as const;
const baseWorlds=[{id:'clockwork-dawn',name:{pl:'Mechaniczny Świt',en:'Clockwork Dawn'},boss:{pl:'Strażnik Bez Świtu',en:'Warden Without Dawn'},motif:'clockwork',palette:{sky:0x11152e,distant:0x253c5b,mid:0x31576a,accent:0x53e8d2,warm:0xffc66d},enemyTypes:[{pl:'Zardzewiała Ćma',en:'Rust Moth'},{pl:'Zegarowy Skoczek',en:'Clockwork Hopper'},{pl:'Sękaty Wartownik',en:'Cog Sentinel'}]},{id:'emerald-wilds',name:{pl:'Szmaragdowa Knieja',en:'Emerald Wilds'},boss:{pl:'Matka Cierni',en:'Thorn Mother'},motif:'wildwood',palette:{sky:0x0b211f,distant:0x1b4b40,mid:0x326e52,accent:0x9af18d,warm:0xffd58b},enemyTypes:[{pl:'Cierniowy Pająk',en:'Bramble Spider'},{pl:'Głodny Zarodnik',en:'Hungry Spore'},{pl:'Korzeniowy Strażnik',en:'Root Sentinel'}]},{id:'mirror-desert',name:{pl:'Pustynia Luster',en:'Mirror Desert'},boss:{pl:'Król Bez Twarzy',en:'The Faceless King'},motif:'mirror-dunes',palette:{sky:0x2b1c35,distant:0x80513e,mid:0xb47858,accent:0xffd878,warm:0xfff0bc},enemyTypes:[{pl:'Szklany Skorpion',en:'Glass Scorpion'},{pl:'Pyłowy Upiór',en:'Dust Wraith'},{pl:'Odbicie',en:'Reflection'}]},{id:'frozen-orbit',name:{pl:'Zamarznięta Orbita',en:'Frozen Orbit'},boss:{pl:'Astronom Mrozu',en:'The Frost Astronomer'},motif:'ice-orbit',palette:{sky:0x101b38,distant:0x29476b,mid:0x4d7fa0,accent:0xaff1ff,warm:0xfff2c4},enemyTypes:[{pl:'Lodowy Roztocz',en:'Ice Mite'},{pl:'Dryfujący Odłamek',en:'Drifting Shard'},{pl:'Zimny Wędrowiec',en:'Cold Wanderer'}]}] as const;
const layouts:PlatformData[][]=[
[{x:0,y:620,width:500,height:100,kind:'stone'},{x:580,y:560,width:180,height:24,kind:'stone'},{x:825,y:505,width:160,height:24,kind:'crumble'},{x:1050,y:550,width:170,height:24,kind:'stone'},{x:1300,y:475,width:170,height:24,kind:'moving'},{x:1570,y:535,width:180,height:24,kind:'stone'},{x:1840,y:465,width:190,height:24,kind:'bounce'},{x:2130,y:535,width:250,height:24,kind:'stone'},{x:2440,y:620,width:440,height:100,kind:'stone'}],
[{x:0,y:620,width:360,height:100,kind:'stone'},{x:440,y:535,width:160,height:24,kind:'stone'},{x:660,y:465,width:150,height:24,kind:'moving'},{x:880,y:520,width:160,height:24,kind:'crumble'},{x:1110,y:445,width:170,height:24,kind:'stone'},{x:1360,y:520,width:180,height:24,kind:'stone'},{x:1610,y:460,width:160,height:24,kind:'bounce'},{x:1850,y:520,width:230,height:24,kind:'stone'},{x:2180,y:620,width:600,height:100,kind:'stone'}],
[{x:0,y:620,width:420,height:100,kind:'stone'},{x:470,y:560,width:140,height:24,kind:'stone'},{x:660,y:500,width:140,height:24,kind:'stone'},{x:870,y:545,width:150,height:24,kind:'crumble'},{x:1080,y:470,width:150,height:24,kind:'moving'},{x:1300,y:515,width:150,height:24,kind:'stone'},{x:1520,y:445,width:160,height:24,kind:'bounce'},{x:1760,y:520,width:200,height:24,kind:'stone'},{x:2050,y:620,width:700,height:100,kind:'stone'}],
[{x:0,y:620,width:460,height:100,kind:'stone'},{x:520,y:545,width:145,height:24,kind:'moving'},{x:730,y:480,width:150,height:24,kind:'stone'},{x:950,y:430,width:135,height:24,kind:'crumble'},{x:1150,y:495,width:160,height:24,kind:'stone'},{x:1380,y:430,width:150,height:24,kind:'bounce'},{x:1600,y:485,width:170,height:24,kind:'moving'},{x:1850,y:535,width:190,height:24,kind:'stone'},{x:2130,y:620,width:650,height:100,kind:'stone'}],
[{x:0,y:620,width:440,height:100,kind:'stone'},{x:500,y:550,width:145,height:24,kind:'stone'},{x:700,y:490,width:150,height:24,kind:'crumble'},{x:920,y:535,width:145,height:24,kind:'moving'},{x:1130,y:460,width:155,height:24,kind:'stone'},{x:1350,y:500,width:155,height:24,kind:'bounce'},{x:1570,y:445,width:160,height:24,kind:'crumble'},{x:1810,y:510,width:210,height:24,kind:'stone'},{x:2110,y:620,width:680,height:100,kind:'stone'}]
,
[{x:0,y:620,width:520,height:100,kind:'stone'},{x:610,y:560,width:140,height:24,kind:'crumble'},{x:790,y:505,width:130,height:24,kind:'stone'},{x:970,y:445,width:145,height:24,kind:'moving'},{x:1175,y:390,width:140,height:24,kind:'stone'},{x:1380,y:455,width:150,height:24,kind:'falling'},{x:1590,y:515,width:170,height:24,kind:'stone'},{x:1830,y:555,width:205,height:24,kind:'bounce'},{x:2130,y:620,width:650,height:100,kind:'stone'}],
[{x:0,y:620,width:380,height:100,kind:'stone'},{x:465,y:565,width:130,height:24,kind:'stone'},{x:645,y:510,width:130,height:24,kind:'moving'},{x:825,y:455,width:125,height:24,kind:'crumble'},{x:1005,y:400,width:145,height:24,kind:'stone'},{x:1205,y:460,width:130,height:24,kind:'bounce'},{x:1390,y:520,width:155,height:24,kind:'falling'},{x:1605,y:570,width:185,height:24,kind:'stone'},{x:1880,y:620,width:900,height:100,kind:'stone'}],
[{x:0,y:620,width:500,height:100,kind:'stone'},{x:580,y:545,width:155,height:24,kind:'bounce'},{x:790,y:480,width:155,height:24,kind:'stone'},{x:1000,y:420,width:145,height:24,kind:'moving'},{x:1210,y:475,width:155,height:24,kind:'crumble'},{x:1425,y:530,width:170,height:24,kind:'stone'},{x:1655,y:460,width:145,height:24,kind:'bounce'},{x:1865,y:515,width:195,height:24,kind:'falling'},{x:2160,y:620,width:620,height:100,kind:'stone'}],
[{x:0,y:620,width:420,height:100,kind:'stone'},{x:500,y:550,width:145,height:24,kind:'moving'},{x:695,y:490,width:135,height:24,kind:'crumble'},{x:885,y:430,width:145,height:24,kind:'stone'},{x:1080,y:370,width:150,height:24,kind:'bounce'},{x:1285,y:430,width:140,height:24,kind:'falling'},{x:1480,y:490,width:145,height:24,kind:'stone'},{x:1685,y:550,width:190,height:24,kind:'moving'},{x:1960,y:620,width:820,height:100,kind:'stone'}],
[{x:0,y:620,width:560,height:100,kind:'stone'},{x:650,y:570,width:145,height:24,kind:'falling'},{x:850,y:520,width:135,height:24,kind:'falling'},{x:1040,y:470,width:135,height:24,kind:'crumble'},{x:1230,y:420,width:145,height:24,kind:'stone'},{x:1435,y:470,width:140,height:24,kind:'moving'},{x:1635,y:520,width:145,height:24,kind:'crumble'},{x:1840,y:570,width:180,height:24,kind:'stone'},{x:2110,y:620,width:670,height:100,kind:'stone'}],
[{x:0,y:620,width:400,height:100,kind:'stone'},{x:490,y:550,width:155,height:24,kind:'stone'},{x:700,y:495,width:130,height:24,kind:'moving'},{x:885,y:550,width:135,height:24,kind:'falling'},{x:1080,y:475,width:140,height:24,kind:'bounce'},{x:1280,y:405,width:145,height:24,kind:'crumble'},{x:1480,y:475,width:140,height:24,kind:'moving'},{x:1680,y:545,width:190,height:24,kind:'stone'},{x:1960,y:620,width:820,height:100,kind:'stone'}],
[{x:0,y:620,width:620,height:100,kind:'stone'},{x:710,y:565,width:140,height:24,kind:'moving'},{x:900,y:505,width:155,height:24,kind:'stone'},{x:1110,y:445,width:130,height:24,kind:'falling'},{x:1295,y:385,width:140,height:24,kind:'bounce'},{x:1495,y:445,width:145,height:24,kind:'crumble'},{x:1700,y:505,width:150,height:24,kind:'moving'},{x:1910,y:565,width:190,height:24,kind:'stone'},{x:2190,y:620,width:590,height:100,kind:'stone'}],
[{x:0,y:620,width:430,height:100,kind:'stone'},{x:510,y:565,width:140,height:24,kind:'crumble'},{x:705,y:510,width:145,height:24,kind:'stone'},{x:905,y:565,width:135,height:24,kind:'moving'},{x:1095,y:510,width:145,height:24,kind:'bounce'},{x:1295,y:455,width:135,height:24,kind:'falling'},{x:1485,y:510,width:145,height:24,kind:'crumble'},{x:1690,y:565,width:185,height:24,kind:'stone'},{x:1965,y:620,width:815,height:100,kind:'stone'}]];
const routeBlueprints:number[][]=[
  [0,1,2,3,4,5,6,7],[4,7,10,2,5,8,11,1],[8,11,2,6,9,12,3,5],[12,3,6,10,0,4,7,9],[2,5,8,12,3,6,9,11],
  [6,9,12,3,7,10,0,2],[10,0,4,7,11,1,5,8],[1,4,7,10,2,6,9,12],[5,8,11,1,4,7,10,0],[9,12,3,6,10,0,4,7],
  [3,6,9,0,5,8,11,2],[7,10,1,4,8,11,2,5],[11,2,5,9,12,3,6,10],[0,4,8,11,1,5,9,12],[4,8,12,2,6,10,1,5],
  [8,12,3,7,11,2,6,9],[12,1,5,8,0,4,10,3],[2,6,10,0,3,7,11,4],[6,10,1,5,9,12,3,7],[10,2,6,9,12,1,5,8]
];
function buildLevel(wi:number,li:number):LevelData{
  const world=baseWorlds[wi]!,id=world.id+'-'+(li+1),title=titles[wi]![li]!,platforms:PlatformData[]=[];
  const segmentWidth=4300,route=routeBlueprints[wi*5+li]!;
  for(let segment=0;segment<8;segment++){
    const source=layouts[route[segment]!]!,offset=segment*segmentWidth;
    const part=source.map((p,i)=>({...p,
      x:Math.round(p.x*1.48)+offset+wi*7+(wi===2&&i%2===1?16:0),
      width:Math.round(p.width*1.12),
      y:Math.max(390,Math.min(620,p.y+(wi===1&&i%3===0?-16:wi===2&&i%2===0?14:wi===3?-10:0)+((li+wi+segment)%3===0&&i%2===1?-25:0)+Math.sin(segment*2+wi)*12)),
      kind:i===0||i===source.length-1?'stone':(li+wi+segment)%2===1&&i===2?'falling':wi===1&&p.kind==='moving'?'bounce':wi===2&&p.kind==='bounce'?'moving':wi===3&&p.kind==='stone'?'ice':p.kind
    }));
    const routeCount=part.length;
    for(let i=0;i<routeCount-1;i++){
      const a=part[i]!,b=part[i+1]!,gap=b.x-(a.x+a.width);
      if(gap>115&&gap<360){
        const count=Math.ceil(gap/165);
        for(let j=1;j<count;j++){
          const x=Math.round(a.x+a.width+gap*j/count-46),y=Math.max(365,Math.min(555,Math.round(a.y+(b.y-a.y)*j/count-38)));
          part.push({x,y,width:92,height:18,kind:(j+i+li+wi+segment)%4===0?'falling':'stone'});
        }
      }
    }
    if((li+wi+segment)%2===0)part.push({x:part[3]!.x+part[3]!.width+35,y:405,width:118,height:18,kind:'stone'},{x:part[4]!.x+145,y:365,width:104,height:18,kind:'falling'});
    for(let layer=0;layer<4;layer++){
      const anchor=part[1+layer*2]!,lift=128+((li+wi+segment+layer)%3)*18;
      part.push({x:Math.round(anchor.x+anchor.width*.42),y:Math.max(325,anchor.y-lift),width:118+(layer%2)*22,height:18,kind:(['bounce','moving','crumble','stone'] as const)[(layer+segment+wi)%4]!});
    }
    platforms.push(...part);
  }
  platforms.sort((a,b)=>a.x-b.x);
  const last=platforms[platforms.length-1]!,width=last.x+last.width;
  const crystals:{id:string;x:number;y:number;secret?:boolean}[]=[];
  for(let segment=0;segment<8;segment++){
    const inSection=platforms.filter(p=>p.x>=segment*segmentWidth&&p.x<(segment+1)*segmentWidth&&p.width>100);
    const main=inSection.filter(p=>p.y>430),upper=inSection.filter(p=>p.y<=430);
    const target=main[Math.min(2,main.length-1)]!,secretRoute=upper[Math.min(1,upper.length-1)]!;
    crystals.push({id:id+'-crystal-'+(segment+1),x:Math.round(target.x+target.width*.52),y:target.y-72});
    crystals.push({id:id+'-secret-'+(segment+1),x:Math.round(secretRoute.x+secretRoute.width*.52),y:secretRoute.y-34,secret:true});
  }
  const checkpoints=[1,2,3,4,5,6,7].map(n=>{
    const targetX=width*n/8,platform=platforms.filter(p=>p.kind==='stone'&&p.x<targetX).at(-1)!;
    return{id:id+'-checkpoint-'+n,x:Math.min(platform.x+platform.width-36,Math.max(platform.x+36,targetX)),y:platform.y};
  });
  const friendPlatform=platforms.filter(p=>p.kind==='stone'&&p.x<width*.72).at(-1)!;
  return{id,worldId:world.id,index:li+1,kind:li===2?'rhythm':li===4?'boss':'story',title:{pl:title[0],en:title[1]},width,spawn:{x:80,y:560},exitX:width-90,platforms,crystals,checkpoints,friend:{id:id+'-friend',x:friendPlatform.x+friendPlatform.width*.52,y:friendPlatform.y-55},mechanic:world.motif};
}export const WORLDS:WorldData[]=baseWorlds.map((world,wi)=>({...world,levels:titles[wi]!.map((_,li)=>buildLevel(wi,li))}));export const FIRST_LEVEL=WORLDS[0]!.levels[0]!;
