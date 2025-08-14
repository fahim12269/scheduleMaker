import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAppStore } from '../store/appStore';
import { format, isAfter } from 'date-fns';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';

/**
 * Lists upcoming appointments with the ability to cancel.
 * Reads data from the global Zustand store.
 */
export default function AppointmentsScreen() {
  const appointments = useAppStore(s => s.appointments);
  const barbers = useAppStore(s => s.barbers);
  const cancelAppointment = useAppStore(s => s.cancelAppointment);
  const logout = useAuthStore(s => s.logout);
  const insets = useSafeAreaInsets();

  const upcoming = useMemo(() =>
    appointments
      .map(a => ({ ...a, start: new Date(a.startISO) }))
      .filter(a => isAfter(a.start, new Date()))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
  , [appointments]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Your appointments</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={upcoming}
        keyExtractor={a => a.id}
        renderItem={({ item }) => {
          const barber = barbers.find(b => b.id === item.barberId)!;
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{barber.name}</Text>
              <Text style={styles.meta}>{format(new Date(item.startISO), 'EEE, MMM d')} · {format(new Date(item.startISO), 'HH:mm')}</Text>
              <TouchableOpacity style={styles.cancel} onPress={() => cancelAppointment(item.id)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{ padding: 16, color: '#6B7280' }}>No upcoming appointments</Text>}
        contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16 },
  header: { fontSize: 24, fontWeight: '700', color: '#111827' },
  logoutBtn: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  logoutText: { color: '#111827', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 12,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  meta: { color: '#6B7280', marginTop: 4 },
  cancel: { marginTop: 8, alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#FEE2E2' },
  cancelText: { color: '#B91C1C', fontWeight: '600' },
});