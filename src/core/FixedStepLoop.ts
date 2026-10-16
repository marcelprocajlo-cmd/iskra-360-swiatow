export const FIXED_STEP_SECONDS=1/60;export const MAX_FRAME_SECONDS=.1;
/** Deterministic accumulator: simulation advances only in 60 Hz quanta. */
export class FixedStepLoop{private accumulator=0;advance(deltaMs:number,update:(dt:number)=>void):number{this.accumulator+=Math.min(Math.max(deltaMs,0)/1000,MAX_FRAME_SECONDS);let steps=0;while(this.accumulator>=FIXED_STEP_SECONDS&&steps<6){update(FIXED_STEP_SECONDS);this.accumulator-=FIXED_STEP_SECONDS;steps+=1;}if(steps===6)this.accumulator=Math.min(this.accumulator,FIXED_STEP_SECONDS);return steps;}reset():void{this.accumulator=0;}}
