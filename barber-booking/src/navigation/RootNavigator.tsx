import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BarberScreen from '../screens/BarberScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Tabs: undefined;
  Barber: { barberId: string };
  Confirm: { barberId: string; serviceId: string; dateISO: string; timeISO: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: { height: 56 + insets.bottom, paddingBottom: Math.max(8, insets.bottom), paddingTop: 8 },
        tabBarIcon: ({ color, size, focused }) => {
          const name = route.name === 'Home' ? (focused ? 'home' : 'home-outline') : (focused ? 'calendar' : 'calendar-outline');
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    </Tab.Navigator>
  );
}

function getTheme(colorScheme: ColorSchemeName) {
  return colorScheme === 'dark' ? DarkTheme : DefaultTheme;
}

export default function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Barber" component={BarberScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}