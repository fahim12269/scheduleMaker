import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'barber_booking' });

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