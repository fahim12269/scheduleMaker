import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { TimeSlot } from '../lib/availability';

type Props = {
  slots: TimeSlot[];
  onSelect: (slot: TimeSlot) => void;
};

export default function TimeSlotGrid({ slots, onSelect }: Props) {
  if (slots.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.empty}>No slots available</Text>
      </View>
    );
  }
  return (
    <View style={styles.grid}>
      {slots.map((slot, idx) => (
        <TouchableOpacity key={idx} onPress={() => onSelect(slot)} style={styles.cell}>
          <Text style={styles.cellText}>{format(slot.start, 'HH:mm')}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  cellText: {
    fontWeight: '600',
    color: '#111827',
  },
  emptyWrap: { padding: 16, alignItems: 'center' },
  empty: { color: '#6B7280' },
});