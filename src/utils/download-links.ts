/**
 * Accept the same paste formats as the desktop download page: one URL per
 * line, or URLs separated by commas. Empty entries are ignored and order is
 * preserved so the queue matches what the user pasted.
 */
export function splitDownloadLinks(input: string): string[] {
  return input
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}
