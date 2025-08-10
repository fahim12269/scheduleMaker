/**
 * Web storage shim that mirrors the minimal MMKV API used by the app.
 * Uses `localStorage` under the hood.
 */
export const storage = {
  getString(key: string): string | undefined {
    try {
      const v = localStorage.getItem(key);
      return v === null ? undefined : v;
    } catch {
      return undefined;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }
} as const;