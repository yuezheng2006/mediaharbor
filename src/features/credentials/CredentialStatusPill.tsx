import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useCredentialStatus } from '@/stores/useCredentialHealthStore';
import { cn } from '@/utils/cn';
import { tauriAPI } from '@/tauri-bridge';
import { tr } from '@/i18n';

interface Props {
  platform: string;
  className?: string;
}

function formatExpiry(seconds: number): string {
  const ms = seconds * 1000 - Date.now();
  if (ms <= 0) return tr('expired');
  const days = Math.floor(ms / (24 * 3600 * 1000));
  if (days >= 2) return tr('{count} days', { count: days });
  const hours = Math.floor(ms / (3600 * 1000));
  if (hours >= 2) return tr('{count} h', { count: hours });
  const mins = Math.max(1, Math.floor(ms / 60000));
  return tr('{count} min', { count: mins });
}

export function CredentialStatusPill({ platform, className }: Props) {
  const status = useCredentialStatus(platform);
  const [busy, setBusy] = useState(false);

  if (!status) return null;

  let label = '';
  let tone = '';
  switch (status.kind) {
    case 'notConfigured':
      label = tr('Not connected');
      tone = 'bg-muted/40 text-muted-foreground';
      break;
    case 'ok':
      label = status.expiresAt
        ? tr('Connected · expires in {time}', { time: formatExpiry(status.expiresAt) })
        : tr('Connected');
      tone = 'bg-emerald-500/15 text-emerald-300';
      break;
    case 'expiringSoon':
      label = tr('Expires in {time}', { time: formatExpiry(status.expiresAt) });
      tone = 'bg-amber-500/15 text-amber-300';
      break;
    case 'expired':
      label = tr('Needs re-auth');
      tone = 'bg-red-500/15 text-red-300';
      break;
    case 'unknown':
      label = tr('Last check failed');
      tone = 'bg-muted/40 text-muted-foreground';
      break;
  }

  const onRecheck = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await tauriAPI.credentials?.recheck(platform);
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', tone)}>{label}</span>
      <button
        type="button"
        onClick={onRecheck}
        disabled={busy}
        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-50"
        aria-label={tr("Re-check credentials")}
      >
        <RefreshCw className={cn('h-3 w-3', busy && 'animate-spin')} />
        {tr('Re-check')}
      </button>
    </span>
  );
}
