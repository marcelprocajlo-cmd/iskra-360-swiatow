import Phaser from 'phaser';
import { getInitialLanguage, translate } from '../core/i18n';
import { loadSave } from '../core/save';
import { SynthAudio } from '../audio/SynthAudio';

export class VictoryScene extends Phaser.Scene {
  constructor() { super('VictoryScene'); }
  create(): void {
    const language = getInitialLanguage();
    const save = loadSave();
    const audio: unknown = this.game.registry.get('synthAudio') as unknown;
    if (audio instanceof SynthAudio && audio.isUnlocked()) audio.startMusic('menu');
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#090d1d');
    const background = this.add.graphics();
    background.fillGradientStyle(0x29476b, 0x1b3551, 0x090d1d, 0x090d1d, 1);
    background.fillRect(0, 0, width, height);
    const center = this.add.circle(width / 2, height * .34, 92, 0xffd47d, .08).setStrokeStyle(3, 0xffe9a6, .4);
    this.tweens.add({ targets: center, scale: 1.18, alpha: .04, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    for (let i = 0; i < 70; i += 1) {
      const mote = this.add.circle(Phaser.Math.Between(20, width - 20), Phaser.Math.Between(20, height - 20), Phaser.Math.Between(1, 3), i % 3 === 0 ? 0xffd47d : 0x79e8e0, .65);
      this.tweens.add({ targets: mote, y: mote.y - Phaser.Math.Between(35, 100), alpha: .08, duration: Phaser.Math.Between(1500, 4000), yoyo: true, repeat: -1, delay: i * 15 });
    }
    this.add.text(width / 2, height * .17, translate(language, 'victory'), { fontFamily: 'Georgia,serif', fontSize: '36px', fontStyle: 'bold', color: '#fff5d4', stroke: '#10172c', strokeThickness: 6, align: 'center', wordWrap: { width: width * .8 } }).setOrigin(.5);
    this.add.text(width / 2, height * .53, translate(language, 'victoryStory'), { fontFamily: 'Georgia,serif', fontSize: '19px', color: '#c6dcf1', fontStyle: 'italic', align: 'center', wordWrap: { width: width * .72 } }).setOrigin(.5);
    this.add.text(width / 2, height * .61, (language === 'pl' ? 'Poziomy ukończone: ' : 'Levels completed: ') + save.completedLevels.length + ' / 20   ·   ✧ ' + save.crystals, { fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#f5dba1' }).setOrigin(.5);
    const button = (y: number, label: string, primary: boolean, action: () => void): void => {
      const bg = this.add.rectangle(width / 2, y, 330, 52, primary ? 0x4ce8d5 : 0x18243e, 1).setStrokeStyle(2, primary ? 0xc4fff3 : 0x50678b, .9).setInteractive({ useHandCursor: true });
      this.add.text(width / 2, y, label, { fontFamily: 'system-ui,sans-serif', fontSize: '15px', fontStyle: 'bold', color: primary ? '#08131e' : '#e5edff' }).setOrigin(.5);
      bg.on('pointerover', () => this.tweens.add({ targets: bg, scaleX: 1.025, scaleY: 1.04, duration: 100 }));
      bg.on('pointerout', () => this.tweens.add({ targets: bg, scaleX: 1, scaleY: 1, duration: 100 }));
      bg.on('pointerdown', action);
    };
    button(height * .74, translate(language, 'continueJourney'), true, () => this.scene.start('WorldMapScene'));
    button(height * .84, translate(language, 'backToMenu'), false, () => this.scene.start('MainMenuScene'));
  }
}
