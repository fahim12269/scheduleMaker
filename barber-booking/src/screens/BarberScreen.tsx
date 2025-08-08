import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/appStore';
import ServicePicker from '../components/ServicePicker';
import DayCalendar from '../components/DayCalendar';
import TimeSlotGrid from '../components/TimeSlotGrid';
import { getAvailableSlotsForDate } from '../lib/availability';
import { format } from 'date-fns';

export default function BarberScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { barberId } = route.params as { barberId: string };
  const barbers = useAppStore(s => s.barbers);
  const appointments = useAppStore(s => s.appointments);
  const barber = barbers.find(b => b.id === barberId)!;

  const [selectedServiceId, setSelectedServiceId] = useState(barber.services[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customerName, setCustomerName] = useState('');

  const service = useMemo(() => barber.services.find(s => s.id === selectedServiceId)!, [barber, selectedServiceId]);
  const slots = useMemo(() => getAvailableSlotsForDate(barber, service, selectedDate, appointments), [barber, service, selectedDate, appointments]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Image source={{ uri: barber.avatarUrl }} style={styles.banner} />
        <Text style={styles.title}>{barber.name}</Text>

        <Text style={styles.section}>Services</Text>
        <ServicePicker services={barber.services} selectedServiceId={selectedServiceId} onSelect={setSelectedServiceId} />

        <Text style={styles.section}>Pick a date</Text>
        <DayCalendar selectedDate={selectedDate} onChange={setSelectedDate} />

        <Text style={styles.section}>Available times on {format(selectedDate, 'EEE, MMM d')}</Text>
        <TimeSlotGrid
          slots={slots}
          onSelect={slot =>
            navigation.navigate('Confirm', {
              barberId: barber.id,
              serviceId: service.id,
              dateISO: selectedDate.toISOString(),
              timeISO: slot.start.toISOString(),
            })
          }
        />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: { width: '100%', height: 220 },
  title: { fontSize: 24, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12 },
  section: { fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginTop: 16, marginBottom: 8 },
  input: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },
});