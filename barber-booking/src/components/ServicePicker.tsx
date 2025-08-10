import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Service } from '../types';

/**
 * Props for `ServicePicker`.
 * - `services`: Available services to display.
 * - `selectedServiceId`: Currently selected service identifier.
 * - `onSelect`: Callback invoked when a service is selected.
 */
type Props = {
  services: Service[];
  selectedServiceId: string;
  onSelect: (serviceId: string) => void;
};

/**
 * Horizontal (or wrapped) pill selector for barber services.
 * Adjusts layout for compact screens.
 */
export default function ServicePicker({ services, selectedServiceId, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  if (isCompact) {
    return (
      <View style={styles.wrapContainer}>
        {services.map(s => {
          const selected = s.id === selectedServiceId;
          return (
            <TouchableOpacity key={s.id} onPress={() => onSelect(s.id)} style={[styles.pill, selected && styles.pillSelected]}>
              <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{s.name}</Text>
              <Text style={[styles.pillSubText, selected && styles.pillTextSelected]}>
                {Math.round(s.durationMinutes)}m · ${(s.priceCents / 100).toFixed(0)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {services.map(s => {
        const selected = s.id === selectedServiceId;
        return (
          <TouchableOpacity key={s.id} onPress={() => onSelect(s.id)} style={[styles.pill, selected && styles.pillSelected]}>
            <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{s.name}</Text>
            <Text style={[styles.pillSubText, selected && styles.pillTextSelected]}>
              {Math.round(s.durationMinutes)}m · ${(s.priceCents / 100).toFixed(0)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 8 },
  wrapContainer: { paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  pillSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  pillText: { color: '#111827', fontWeight: '600' },
  pillTextSelected: { color: '#fff' },
  pillSubText: { color: '#6B7280', fontSize: 12 },
});