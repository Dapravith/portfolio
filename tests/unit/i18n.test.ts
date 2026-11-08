import { describe, expect, it } from 'vitest';
import { isLocale, localizePath, stripLocale } from '@/i18n/config';
import { formatMonth, pick } from '@/lib/site';

describe('locale paths', () => {
  it('keeps English at the root and prefixes Khmer', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/about', 'en')).toBe('/about');
    expect(localizePath('/', 'km')).toBe('/km');
    expect(localizePath('/projects/x', 'km')).toBe('/km/projects/x');
  });

  it('strips a locale prefix only when it is a whole segment', () => {
    expect(stripLocale('/km')).toBe('/');
    expect(stripLocale('/km/about')).toBe('/about');
    expect(stripLocale('/en/about')).toBe('/about');
    expect(stripLocale('/kmz')).toBe('/kmz');
    expect(stripLocale('/about')).toBe('/about');
  });

  it('validates locales', () => {
    expect(isLocale('km')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('localized values', () => {
  it('falls back to English and reports it', () => {
    expect(pick({ en: 'Hello' }, 'km')).toEqual({ text: 'Hello', fallback: true });
    expect(pick({ en: 'Hello', km: 'សួស្តី' }, 'km')).toEqual({ text: 'សួស្តី', fallback: false });
    expect(pick({ en: 'Hello', km: 'សួស្តី' }, 'en')).toEqual({ text: 'Hello', fallback: false });
  });

  it('formats months per locale', () => {
    expect(formatMonth('2024-10', 'en')).toBe('Oct 2024');
    expect(formatMonth('2024-10', 'km')).toMatch(/2024/);
    expect(formatMonth('2024-10', 'km')).not.toMatch(/Oct/);
  });
});
