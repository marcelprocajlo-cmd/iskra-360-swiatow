import Phaser from 'phaser';
import { getInitialLanguage, setLanguage, translate } from '../core/i18n';
import { loadSettings, saveSettings, type GameSettings, type QualityMode } from '../core/settings';
import { SynthAudio } from '../audio/SynthAudio';

export class SettingsScene extends Phaser.Scene {
  constructor() { super('SettingsScene'); }
  create(): void {
    const language = getInitialLanguage();
    const settings = loadSettings();
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#0b1022');
    const background = this.add.graphics();
    background.fillGradientStyle(0x1c2949, 0x191b3c, 0x090d1d, 0x090d1d, 1);
    background.fillRect(0, 0, width, height);
    this.add.text(width / 2, 48, translate(language, 'settings'), { fontFamily: 'Georgia,serif', fontSize: '34px', fontStyle: 'bold', color: '#f1f5ff' }).setOrigin(0.5);
    const button = (x: number, y: number, w: number, label: string, action: () => void, selected = false): void => {
      const bg = this.add.rectangle(x, y, w, 46, selected ? 0x245a59 : 0x18243e, 1).setStrokeStyle(2, selected ? 0x6cf4dc : 0x50678b, 0.85).setInteractive({ useHandCursor: true });
      this.add.text(x, y, label, { fontFamily: 'system-ui,sans-serif', fontSize: '14px', fontStyle: 'bold', color: '#e5edff', align: 'center' }).setOrigin(0.5);
      bg.on('pointerdown', action);
    };
    const saveAndRestart = (next: GameSettings): void => { saveSettings(next); this.scene.restart(); };
    this.add.text(width / 2, 105, translate(language, 'language'), { fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#9fb4d9' }).setOrigin(0.5);
    button(width / 2, 145, 280, language === 'pl' ? 'POLSKI  /  ENGLISH' : 'ENGLISH  /  POLSKI', () => { const next = language === 'pl' ? 'en' : 'pl'; setLanguage(next); saveAndRestart({ ...settings, language: next }); });
    this.add.text(width / 2, 198, translate(language, 'quality'), { fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#9fb4d9' }).setOrigin(0.5);
    const qualities: QualityMode[] = ['low', 'medium', 'high'];
    qualities.forEach((quality, index) => button(width / 2 - 180 + index * 180, 238, 160, translate(language, quality), () => saveAndRestart({ ...settings, quality }), settings.quality === quality));
    button(width / 2, 300, 360, translate(language, 'reducedMotion') + ': ' + translate(language, settings.reducedMotion ? 'on' : 'off'), () => saveAndRestart({ ...settings, reducedMotion: !settings.reducedMotion }), settings.reducedMotion);
    const volumeRow = (y: number, label: string, key: 'masterVolume' | 'musicVolume' | 'sfxVolume'): void => {
      this.add.text(width / 2 - 260, y, translate(language, label as 'masterVolume' | 'musicVolume' | 'sfxVolume'), { fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#d6e2fa' }).setOrigin(0, 0.5);
      this.add.text(width / 2 + 40, y, Math.round(settings[key] * 100) + '%', { fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#f9d98a' }).setOrigin(0.5);
      button(width / 2 + 125, y, 48, '−', () => { const next = { ...settings, [key]: Math.max(0, Math.round((settings[key] - .1) * 10) / 10) }; saveSettings(next); const audio: unknown = this.game.registry.get('synthAudio') as unknown; if (audio instanceof SynthAudio) audio.setVolume(key === 'masterVolume' ? 'master' : key === 'musicVolume' ? 'music' : 'sfx', next[key]); this.scene.restart(); });
      button(width / 2 + 190, y, 48, '+', () => { const next = { ...settings, [key]: Math.min(1, Math.round((settings[key] + .1) * 10) / 10) }; saveSettings(next); const audio: unknown = this.game.registry.get('synthAudio') as unknown; if (audio instanceof SynthAudio) audio.setVolume(key === 'masterVolume' ? 'master' : key === 'musicVolume' ? 'music' : 'sfx', next[key]); this.scene.restart(); });
    };
    volumeRow(375, 'masterVolume', 'masterVolume'); volumeRow(430, 'musicVolume', 'musicVolume'); volumeRow(485, 'sfxVolume', 'sfxVolume');
    button(width / 2, 570, 260, '← ' + translate(language, 'backToMenu'), () => this.scene.start('MainMenuScene'));
  }
}
