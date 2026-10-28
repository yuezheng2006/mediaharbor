import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import { tr } from '@/i18n';

export function StepInstallIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="flex flex-col items-center text-center gap-5 py-6"
    >
      <div className="rounded-2xl bg-primary/10 p-4">
        <PackageOpen className="w-7 h-7 text-primary" />
      </div>
      <div className="space-y-2 max-w-sm">
        <h2 className="text-lg font-semibold">{tr('Install the tools we need')}</h2>
        <p className="text-sm text-muted-foreground">
          {tr(
            "MediaHarbor relies on a handful of small command-line tools to download and convert music. We'll go through them one by one — I'll explain what each does before installing it."
          )}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        {tr('Already-installed tools are skipped automatically.')}
      </p>
    </motion.div>
  );
}
