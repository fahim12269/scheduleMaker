import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarberCard from '../components/BarberCard';
import { useAppStore } from '../store/appStore';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Landing page listing available barbers.
 * Tapping a card navigates to the selected barber's availability page.
 */
export default function HomeScreen() {
  const barbers = useAppStore(s => s.barbers);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Choose your barber</Text>
      <FlatList
        data={barbers}
        renderItem={({ item }) => (
          <BarberCard name={item.name} avatarUrl={item.avatarUrl} onPress={() => navigation.navigate('Barber', { barberId: item.id })} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 + insets.bottom }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { fontSize: 24, fontWeight: '700', color: '#111827', padding: 16 },
});