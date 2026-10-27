import { describe, expect, it } from 'vitest';
import zh from './zh.json';
import { getLocale, setLocale, tr } from './core';

const table = zh as Record<string, string>;

describe('ui locale', () => {
  it('translates known copy and interpolates values', () => {
    setLocale('zh');
    expect(tr('Search')).toBe('搜索');
    expect(tr('Library')).toBe('资料库');
    expect(tr('Show all {count}', { count: 12 })).toBe('显示全部 12 项');
    expect(tr('Not a catalog string')).toBe('Not a catalog string');

    setLocale('en');
    expect(tr('Search')).toBe('Search');
    expect(getLocale()).toBe('en');
    setLocale('zh');
  });

  it('keeps a non-empty Chinese string for every catalog entry', () => {
    const empty = Object.entries(table).filter(([, value]) => value.trim() === '');
    expect(empty).toEqual([]);
    expect(Object.keys(table).length).toBeGreaterThan(700);
  });
});
