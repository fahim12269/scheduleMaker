import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { Appointment, Barber, Service } from '../types';
import { getItem, setItem } from '../storage/mmkv';

export type AppState = {
  barbers: Barber[];
  appointments: Appointment[];
  bookAppointment: (params: { barberId: string; serviceId: string; startISO: string; customerName: string; durationMinutes: number }) => Appointment;
  cancelAppointment: (id: string) => void;
};

const PERSIST_KEY = 'app_state_v1';

function seedBarbers(): Barber[] {
  return [
    {
      id: 'b1',
      name: 'Alex Fade',
      avatarUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400&auto=format&fit=crop',
      services: [
        { id: 's1', name: 'Haircut', durationMinutes: 30, priceCents: 2500 },
        { id: 's2', name: 'Beard Trim', durationMinutes: 20, priceCents: 1500 },
        { id: 's3', name: 'Cut + Beard', durationMinutes: 50, priceCents: 3800 },
      ],
      weeklySchedule: {
        0: null,
        1: { start: '09:00', end: '18:00' },
        2: { start: '09:00', end: '18:00' },
        3: { start: '11:00', end: '20:00' },
        4: { start: '09:00', end: '18:00' },
        5: { start: '09:00', end: '16:00' },
        6: null,
      },
    },
    {
      id: 'b2',
      name: 'Maya Sharp',
      avatarUrl: 'https://images.unsplash.com/photo-1519736001733-7a5ac9b1fca4?q=80&w=400&auto=format&fit=crop',
      services: [
        { id: 's1', name: 'Haircut', durationMinutes: 30, priceCents: 2800 },
        { id: 's2', name: 'Beard Trim', durationMinutes: 20, priceCents: 1600 },
        { id: 's4', name: 'Kids Cut', durationMinutes: 25, priceCents: 2200 },
      ],
      weeklySchedule: {
        0: null,
        1: { start: '10:00', end: '19:00' },
        2: { start: '10:00', end: '19:00' },
        3: { start: '10:00', end: '19:00' },
        4: { start: '10:00', end: '19:00' },
        5: { start: '09:00', end: '15:00' },
        6: null,
      },
    },
  ];
}

function loadInitialState(): Pick<AppState, 'barbers' | 'appointments'> {
  const persisted = getItem<Pick<AppState, 'barbers' | 'appointments'>>(PERSIST_KEY);
  if (persisted) return persisted;
  return { barbers: seedBarbers(), appointments: [] };
}

export const useAppStore = create<AppState>((set, get) => ({
  ...loadInitialState(),
  bookAppointment: ({ barberId, serviceId, startISO, customerName, durationMinutes }) => {
    const start = new Date(startISO);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const appt: Appointment = {
      id: nanoid(),
      barberId,
      serviceId,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      customerName,
    };
    set(state => ({ appointments: [...state.appointments, appt] }));
    const { barbers, appointments } = get();
    setItem(PERSIST_KEY, { barbers, appointments });
    return appt;
  },
  cancelAppointment: (id: string) => {
    set(state => ({ appointments: state.appointments.filter(a => a.id !== id) }));
    const { barbers, appointments } = get();
    setItem(PERSIST_KEY, { barbers, appointments });
  },
}));