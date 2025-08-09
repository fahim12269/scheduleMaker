import type { MMKV as MMKVType } from 'react-native-mmkv';

// Attempt to require MMKV at runtime to avoid crashes in Expo Go (where the native module is not present)
let storage: { getString: (key: string) => string | undefined; set: (key: string, value: string) => void };

try {
  const { MMKV } = require('react-native-mmkv') as { MMKV: typeof MMKVType };
  storage = new MMKV({ id: 'barber_booking' });
} catch {
  // Synchronous in-memory fallback so the app can run in Expo Go
  const memory = new Map<string, string>();
  storage = {
    getString: (key: string) => memory.get(key),
    set: (key: string, value: string) => {
      memory.set(key, value);
    },
  };
}

export function getItem<T>(key: string): T | undefined {
  const value = storage.getString(key);
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}