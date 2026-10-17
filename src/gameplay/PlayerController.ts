export interface Rect { x:number; y:number; width:number; height:number; }
export interface Platform extends Rect { oneWay?:boolean; }
export interface PlayerState extends Rect { vx:number; vy:number; grounded:boolean; facing:-1|1; coyote:number; jumpBuffer:number; jumps:number; dashTime:number; dashCooldown:number; glideStamina:number; health:number; invulnerability:number; wall:-1|0|1; jumpCutApplied:boolean; }
export interface PlayerInput { left:boolean; right:boolean; jumpHeld:boolean; jumpPressed:boolean; dashPressed:boolean; attackPressed:boolean; }
export interface PhysicsTuning { speed:number; acceleration:number; friction:number; gravity:number; jumpVelocity:number; dashSpeed:number; glideGravity:number; }
export const DEFAULT_PHYSICS:PhysicsTuning={speed:300,acceleration:1900,friction:.78,gravity:1650,jumpVelocity:590,dashSpeed:760,glideGravity:390};
export function createPlayer(x:number,y:number):PlayerState{return{x,y,width:34,height:46,vx:0,vy:0,grounded:false,facing:1,coyote:0,jumpBuffer:0,jumps:0,dashTime:0,dashCooldown:0,glideStamina:1,health:3,invulnerability:0,wall:0,jumpCutApplied:false};}
const overlaps=(a:Rect,b:Rect):boolean=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
/** Pure 60 Hz player simulation. Rendering and Phaser objects never enter this module. */
export function stepPlayer(p:PlayerState,input:PlayerInput,platforms:readonly Platform[],dt=1/60,tuning:PhysicsTuning=DEFAULT_PHYSICS):void {
  const wasGrounded=p.grounded, previousWall=p.wall;
  p.coyote=wasGrounded?.105:Math.max(0,p.coyote-dt);
  p.jumpBuffer=input.jumpPressed?.12:Math.max(0,p.jumpBuffer-dt);
  p.dashCooldown=Math.max(0,p.dashCooldown-dt);p.invulnerability=Math.max(0,p.invulnerability-dt);p.dashTime=Math.max(0,p.dashTime-dt);
  const direction=Number(input.right)-Number(input.left);if(direction)p.facing=direction>0?1:-1;
  if(input.dashPressed&&p.dashCooldown<=0){p.dashTime=.14;p.dashCooldown=.55;p.vx=p.facing*tuning.dashSpeed;p.vy*=.25;}
  if(p.jumpBuffer>0&&!wasGrounded&&previousWall!==0){p.vx=-previousWall*360;p.vy=-tuning.jumpVelocity*.82;p.facing=previousWall===1?-1:1;p.jumps=1;p.wall=0;p.coyote=0;p.jumpBuffer=0;p.jumpCutApplied=false;p.glideStamina=1;}
  else if(p.jumpBuffer>0&&(p.coyote>0||p.jumps<2)){p.vy=-tuning.jumpVelocity;p.grounded=false;p.jumps+=1;p.coyote=0;p.jumpBuffer=0;p.jumpCutApplied=false;p.glideStamina=1;}
  if(direction)p.vx+=direction*tuning.acceleration*dt;else p.vx*=wasGrounded?tuning.friction:.985;
  p.vx=Math.max(-tuning.speed,Math.min(tuning.speed,p.vx));
  if(p.dashTime>0)p.vx=p.facing*tuning.dashSpeed;
  else if(input.jumpHeld&&p.vy>0&&p.glideStamina>0){p.vy+=tuning.glideGravity*dt;p.glideStamina=Math.max(0,p.glideStamina-dt*.3);}
  else p.vy+=tuning.gravity*dt;
  if(!input.jumpHeld&&p.vy< -180&&!p.jumpCutApplied){p.vy*=.58;p.jumpCutApplied=true;}
  p.vy=Math.min(p.vy,900);
  const oldX=p.x;p.x+=p.vx*dt;p.wall=0;
  for(const platform of platforms){if(!overlaps(p,platform))continue;if(p.vx>0&&oldX+p.width<=platform.x+8){p.x=platform.x-p.width;p.wall=1;}else if(p.vx<0&&oldX>=platform.x+platform.width-8){p.x=platform.x+platform.width;p.wall=-1;}else continue;p.vx=0;}for(const platform of platforms){const verticalOverlap=p.y<platform.y+platform.height&&p.y+p.height>platform.y;if(!verticalOverlap)continue;if(Math.abs(p.x+p.width-platform.x)<1.1)p.wall=1;else if(Math.abs(p.x-(platform.x+platform.width))<1.1)p.wall=-1;}
  if(p.wall!==0&&p.vy>180)p.vy=Math.min(p.vy,180);
  const oldY=p.y;p.y+=p.vy*dt;p.grounded=false;
  for(const platform of platforms){if(!overlaps(p,platform))continue;if(p.vy>=0&&oldY+p.height<=platform.y+8){p.y=platform.y-p.height;p.vy=0;p.grounded=true;p.jumps=0;p.glideStamina=Math.min(1,p.glideStamina+dt*2);}else if(!platform.oneWay&&p.vy<0&&oldY>=platform.y+platform.height-4){p.y=platform.y+platform.height;p.vy=0;}}
  if(p.x<0){p.x=0;p.vx=0;}
}
