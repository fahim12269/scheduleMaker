import type { MMKV as MMKVType } from 'react-native-mmkv';

/**
 * Lightweight key-value storage abstraction.
 * Falls back to an in-memory map when the native MMKV module is not available (e.g., Expo Go).
 */
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

/**
 * Reads and parses a JSON value from storage.
 * @returns The parsed value or `undefined` if missing/invalid.
 */
export function getItem<T>(key: string): T | undefined {
  const value = storage.getString(key);
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

/**
 * Serializes and writes a JSON value to storage under the provided key.
 */
export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}