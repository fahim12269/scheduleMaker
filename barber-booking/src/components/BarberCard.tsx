import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type BarberCardProps = {
  name: string;
  avatarUrl: string;
  onPress: () => void;
};

export default function BarberCard({ name, avatarUrl, onPress }: BarberCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
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
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },
  meta: { marginTop: 2, color: '#6B7280' },
});