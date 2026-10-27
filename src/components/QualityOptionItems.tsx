import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { tr } from '@/i18n';
import type { QualityOption } from '@/types';

export function QualityOptionItems({ options }: { options: QualityOption[] }) {
  const hasGroups = options.some((o) => o.group);

  if (!hasGroups) {
    return (
      <>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {tr(o.label)}
          </SelectItem>
        ))}
      </>
    );
  }

  const order: string[] = [];
  const buckets = new Map<string, QualityOption[]>();
  for (const o of options) {
    const g = o.group ?? '';
    if (!buckets.has(g)) {
      buckets.set(g, []);
      order.push(g);
    }
    buckets.get(g)!.push(o);
  }

  return (
    <>
      {order.map((g) => (
        <SelectGroup key={g || '_ungrouped'}>
          {g ? <SelectLabel>{tr(g)}</SelectLabel> : null}
          {buckets.get(g)!.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {tr(o.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </>
  );
}
