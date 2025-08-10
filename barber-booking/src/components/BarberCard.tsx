import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

/**
 * Props for `BarberCard`.
 * - `name`: Barber display name.
 * - `avatarUrl`: URL to the barber's avatar image.
 * - `onPress`: Tap handler to navigate to the barber details.
 */
export type BarberCardProps = {
  name: string;
  avatarUrl: string;
  onPress: () => void;
};

/**
 * Compact card displaying a barber with avatar and a call to action.
 */
export default function BarberCard({ name, avatarUrl, onPress }: BarberCardProps) {
  const { width } = useWindowDimensions();
  const avatarSize = Math.max(56, Math.min(72, Math.round(width * 0.18)));
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={[styles.avatar, { width: avatarSize, height: avatarSize }]} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>Tap to view availability</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  avatar: {
    borderRadius: 12,
  },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },
  meta: { marginTop: 2, color: '#6B7280' },
});