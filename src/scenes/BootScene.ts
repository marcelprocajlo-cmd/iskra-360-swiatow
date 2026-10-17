import Phaser from 'phaser';
export class BootScene extends Phaser.Scene{
  constructor(){super('BootScene');}
  preload():void{this.load.svg('spark-robot','/assets/spark-robot.svg',{width:512,height:600});}
  create():void{this.scene.start('MainMenuScene');}
}
