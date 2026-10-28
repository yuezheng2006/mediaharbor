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

  it('covers the onboarding controls and guidance in Chinese', () => {
    setLocale('zh');
    const onboardingCopy = [
      'Back',
      'Skip setup',
      'Start tour',
      'Get Started',
      'Next',
      "MediaHarbor relies on a handful of small command-line tools to download and convert music. We'll go through them one by one — I'll explain what each does before installing it.",
      'Manual install',
      'No thanks',
      'Install failed. You can retry or skip and install it later.',
      'Your tools are ready. We can move on to a couple of basic preferences.',
      'Everything in MediaHarbor lives here. Let me show you each section.',
      "I'll close this dialog and walk you through the actual app — pointing out where each section lives in the sidebar so you know where to find things.",
      'You can skip the tour anytime from the popover.',
    ];

    expect(onboardingCopy.every((copy) => tr(copy) !== copy)).toBe(true);
  });
});
