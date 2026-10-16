import Phaser from 'phaser';
import { getInitialLanguage, translate } from '../core/i18n';

export class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }
  create(): void {
    const language = getInitialLanguage();
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#080817');
    const backdrop = this.add.graphics();
    backdrop.fillGradientStyle(0x26152f, 0x15152f, 0x080817, 0x080817, 1);
    backdrop.fillRect(0, 0, width, height);
    for (let i = 0; i < 36; i += 1) {
      const mote = this.add.circle(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), Phaser.Math.Between(1, 3), 0xff986a, 0.45);
      this.tweens.add({ targets: mote, y: mote.y - 32, alpha: 0.05, duration: Phaser.Math.Between(1300, 3000), yoyo: true, repeat: -1 });
    }
    this.add.text(width / 2, height * 0.28, translate(language, 'gameOver'), { fontFamily: 'Georgia,serif', fontSize: '44px', fontStyle: 'bold', color: '#ffb3a1', stroke: '#160d24', strokeThickness: 6 }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.39, language === 'pl' ? 'Nawet najmniejszy płomień może zapłonąć ponownie.' : 'Even the smallest flame can burn again.', { fontFamily: 'Georgia,serif', fontSize: '19px', color: '#b5c4df', fontStyle: 'italic' }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.48, language === 'pl' ? 'Twój postęp i zebrane kryształy są bezpieczne.' : 'Your progress and collected crystals are safe.', { fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#8fa4c8' }).setOrigin(0.5);
    const addButton = (y: number, label: string, primary: boolean, action: () => void): void => {
      const group = this.add.container(width / 2, y);
      const bg = this.add.rectangle(0, 0, 300, 54, primary ? 0x4ce8d5 : 0x18243e, 1).setStrokeStyle(2, primary ? 0xc4fff3 : 0x50678b, 0.85).setInteractive({ useHandCursor: true });
      const text = this.add.text(0, 0, label, { fontFamily: 'system-ui,sans-serif', fontSize: '16px', fontStyle: 'bold', color: primary ? '#08131e' : '#e5edff' }).setOrigin(0.5);
      group.add([bg, text]);
      bg.on('pointerover', () => this.tweens.add({ targets: group, scale: 1.025, duration: 100 }));
      bg.on('pointerout', () => this.tweens.add({ targets: group, scale: 1, duration: 100 }));
      bg.on('pointerdown', action);
    };
    addButton(height * 0.61, translate(language, 'retry'), true, () => this.scene.start('WorldScene'));
    addButton(height * 0.72, translate(language, 'backToMenu'), false, () => this.scene.start('MainMenuScene'));
  }
}
