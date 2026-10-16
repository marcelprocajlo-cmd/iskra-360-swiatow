import Phaser from 'phaser';
import { getInitialLanguage, translate } from '../core/i18n';
import { loadSave } from '../core/save';
import { WORLDS } from '../levels/storyLevels';

export class WorldMapScene extends Phaser.Scene {
  constructor() { super('WorldMapScene'); }
  create(): void {
    const language = getInitialLanguage();
    const save = loadSave();
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#090d1d');
    const backdrop = this.add.graphics();
    backdrop.fillGradientStyle(0x1a2444, 0x151b38, 0x090d1d, 0x090d1d, 1);
    backdrop.fillRect(0, 0, width, 720);
    for (let i = 0; i < 42; i += 1) {
      const mote = this.add.circle(Phaser.Math.Between(0, width), Phaser.Math.Between(0, 720), Phaser.Math.Between(1, 2), i % 4 === 0 ? 0xffd47d : 0x79e8e0, 0.35);
      this.tweens.add({ targets: mote, y: mote.y - 24, alpha: 0.08, duration: Phaser.Math.Between(1600, 3600), yoyo: true, repeat: -1, delay: i * 17 });
    }
    this.add.text(width / 2, 40, translate(language, 'worldMap'), { fontFamily: 'Georgia,serif', fontSize: '34px', fontStyle: 'bold', color: '#eff8ff', stroke: '#0a1024', strokeThickness: 5 }).setOrigin(0.5);
    this.add.text(width / 2, 80, (language === 'pl' ? 'Postęp zapisany lokalnie' : 'Progress saved locally') + '  ·  ✧ ' + save.crystals, { fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#9fb4d9' }).setOrigin(0.5);
    const back = this.add.container(100, 45);
    const backBg = this.add.rectangle(0, 0, 140, 42, 0x18243e, 1).setStrokeStyle(2, 0x50678b, 0.85).setInteractive({ useHandCursor: true });
    back.add([backBg, this.add.text(0, 0, '← ' + translate(language, 'backToMenu'), { fontFamily: 'system-ui,sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#e5edff' }).setOrigin(0.5)]);
    backBg.on('pointerdown', () => this.scene.start('MainMenuScene'));
    for (const [worldIndex, world] of WORLDS.entries()) {
      const x = 64 + (worldIndex % 2) * 640;
      const y = 128 + Math.floor(worldIndex / 2) * 278;
      this.add.rectangle(x, y, 560, 240, world.palette.sky, 0.82).setOrigin(0).setStrokeStyle(2, world.palette.accent, 0.62);
      this.add.rectangle(x + 1, y + 1, 558, 4, world.palette.warm, 0.8).setOrigin(0);
      this.add.text(x + 20, y + 17, world.name[language], { fontFamily: 'Georgia,serif', fontSize: '20px', fontStyle: 'bold', color: '#f1f5ff' });
      this.add.text(x + 20, y + 49, (language === 'pl' ? 'Strażnik: ' : 'Warden: ') + world.boss[language], { fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#a9c1df' });
      this.add.circle(x + 515, y + 34, 10, world.palette.accent, 0.7).setStrokeStyle(2, world.palette.warm, 0.8);
      for (const level of world.levels) {
        const globalIndex = worldIndex * 5 + level.index;
        const unlocked = globalIndex <= save.unlockedLevel;
        const completed = save.completedLevels.includes(globalIndex);
        const bx = x + 22 + (level.index - 1) * 101;
        const by = y + 105;
        const color = completed ? 0x245f5a : unlocked ? 0x213653 : 0x121a2e;
        const node = this.add.container(bx, by);
        const bg = this.add.rectangle(0, 0, 82, 74, color, unlocked ? 1 : 0.6).setStrokeStyle(2, completed ? 0x69f4d9 : unlocked ? world.palette.accent : 0x34405b, unlocked ? 0.9 : 0.5);
        node.add(bg);
        node.add(this.add.text(0, -12, completed ? '✓ ' + level.index : unlocked ? String(level.index).padStart(2, '0') : '🔒', { fontFamily: 'system-ui,sans-serif', fontSize: '18px', fontStyle: 'bold', color: unlocked ? '#efffff' : '#75819d' }).setOrigin(0.5));
        node.add(this.add.text(0, 21, level.kind === 'boss' ? (language === 'pl' ? 'BOSS' : 'BOSS') : level.kind === 'rhythm' ? '♫' : (language === 'pl' ? 'ETAP' : 'LEVEL'), { fontFamily: 'system-ui,sans-serif', fontSize: '10px', color: unlocked ? '#a9c1df' : '#59637d' }).setOrigin(0.5));
        if (unlocked) {
          bg.setInteractive({ useHandCursor: true });
          bg.on('pointerover', () => this.tweens.add({ targets: node, scale: 1.04, duration: 100 }));
          bg.on('pointerout', () => this.tweens.add({ targets: node, scale: 1, duration: 100 }));
          bg.on('pointerdown', () => this.scene.start('WorldScene', { levelId: level.id }));
        }
      }
    }
  }
}
