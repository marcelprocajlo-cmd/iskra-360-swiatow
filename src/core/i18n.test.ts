import { describe, expect, it } from 'vitest';
import { messages, translate } from './i18n';

describe('PL/EN localization', () => {
  it('keeps the same key set in both languages', () => {
    expect(Object.keys(messages.pl).sort()).toEqual(Object.keys(messages.en).sort());
  });
  it('provides non-empty text for every key in both languages', () => {
    for (const dictionary of [messages.pl, messages.en]) {
      for (const value of Object.values(dictionary)) expect(value.trim().length).toBeGreaterThan(0);
    }
  });
  it('translates the retry flow', () => {
    expect(translate('pl', 'retry')).toBe('SPRÓBUJ PONOWNIE');
    expect(translate('en', 'retry')).toBe('TRY AGAIN');
  });
});
