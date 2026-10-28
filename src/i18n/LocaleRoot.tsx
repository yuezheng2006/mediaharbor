import type { ReactNode } from 'react';
import { useLocale } from './core';

/** Remounts the tree when the language changes so every `tr()` call sees the new catalog. */
export function LocaleRoot({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <div key={locale} className="contents">
      {children}
    </div>
  );
}
