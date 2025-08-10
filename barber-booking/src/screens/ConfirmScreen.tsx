import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/appStore';
import { format } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Confirmation screen that summarizes the booking before committing.
 */
export default function ConfirmScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { barberId, serviceId, dateISO, timeISO } = route.params as {
    barberId: string;
    serviceId: string;
    dateISO: string;
    timeISO: string;
  };
  const { barbers, bookAppointment } = useAppStore.getState();
  const barber = barbers.find(b => b.id === barberId)!;
  const service = barber.services.find(s => s.id === serviceId)!;
  const start = new Date(timeISO);
  const [customerName] = useState('Guest');

  const insets = useSafeAreaInsets();

  /**
   * Creates the appointment in the store and navigates to the Appointments tab.
   */
  const onConfirm = () => {
    bookAppointment({
      barberId: barber.id,
      serviceId: service.id,
      startISO: start.toISOString(),
      customerName,
      durationMinutes: service.durationMinutes,
    });
    Alert.alert('Booked!', `See you ${format(start, 'EEE, MMM d')} at ${format(start, 'HH:mm')}`);
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }, { name: 'Appointments' as any }] });
  };

  return (
    <View style={[styles.container, { paddingBottom: 16 + insets.bottom }]}>
      <Text style={styles.title}>Confirm booking</Text>
      <View style={styles.card}>
        <Text style={styles.row}><Text style={styles.label}>Barber:</Text> {barber.name}</Text>
        <Text style={styles.row}><Text style={styles.label}>Service:</Text> {service.name}</Text>
        <Text style={styles.row}><Text style={styles.label}>When:</Text> {format(start, 'EEE, MMM d')} · {format(start, 'HH:mm')}</Text>
        <Text style={styles.row}><Text style={styles.label}>Duration:</Text> {service.durationMinutes} min</Text>
        <Text style={styles.row}><Text style={styles.label}>Price:</Text> ${(service.priceCents / 100).toFixed(0)}</Text>
      </View>

      <TouchableOpacity style={styles.cta} onPress={onConfirm}>
        <Text style={styles.ctaText}>Confirm appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 8 },
  row: { fontSize: 16, color: '#111827' },
  label: { color: '#6B7280' },
  cta: { marginTop: 24, backgroundColor: '#111827', padding: 14, borderRadius: 12, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
});