import { useSyncExternalStore } from 'react';
import zh from './zh.json';
import { getLocale, subscribeLocale, type Locale } from './locale';

const zhTable = zh as Record<string, string>;

export function tr(message: string, vars?: Record<string, string | number>): string {
  let text = getLocale() === 'zh' ? (zhTable[message] ?? message) : message;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      text = text.split(`{${key}}`).join(String(value));
    }
  }
  return text;
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribeLocale, getLocale, () => 'en');
}

export { getLocale, setLocale, type Locale } from './locale';
