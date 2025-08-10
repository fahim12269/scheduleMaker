import { addMinutes, areIntervalsOverlapping, format, isBefore, isSameDay, parse, set } from 'date-fns';
import { Appointment, Barber, Service } from '../types';

/**
 * Represents a continuous time interval.
 */
export type TimeSlot = { start: Date; end: Date };

/**
 * Builds the daily working interval for a barber on a given date.
 * Returns `null` if the barber does not work that day or if hours are invalid.
 */
function buildWorkIntervalForDate(barber: Barber, date: Date): TimeSlot | null {
  const weekday = date.getDay();
  const hours = barber.weeklySchedule[weekday];
  if (!hours) return null;
  const [startH, startM] = hours.start.split(':').map(Number);
  const [endH, endM] = hours.end.split(':').map(Number);
  const start = set(date, { hours: startH, minutes: startM, seconds: 0, milliseconds: 0 });
  const end = set(date, { hours: endH, minutes: endM, seconds: 0, milliseconds: 0 });
  if (isBefore(end, start)) return null;
  return { start, end };
}

/**
 * Generates candidate time slots within a working interval.
 * Step defaults to 15 minutes but can be adjusted.
 */
function generateCandidateSlots(work: TimeSlot, service: Service, stepMinutes: number = 15): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let cursor = new Date(work.start);
  while (!isBefore(work.end, addMinutes(cursor, service.durationMinutes))) {
    const end = addMinutes(cursor, service.durationMinutes);
    slots.push({ start: new Date(cursor), end });
    cursor = addMinutes(cursor, stepMinutes);
  }
  return slots;
}

/**
 * Computes available slots for a barber, service and date, excluding overlaps with existing appointments.
 */
export function getAvailableSlotsForDate(
  barber: Barber,
  service: Service,
  date: Date,
  existingAppointments: Appointment[],
): TimeSlot[] {
  const work = buildWorkIntervalForDate(barber, date);
  if (!work) return [];
  const candidates = generateCandidateSlots(work, service);

  const sameDayAppointments = existingAppointments.filter(
    a => a.barberId === barber.id && isSameDay(new Date(a.startISO), date),
  );

  return candidates.filter(slot => {
    return !sameDayAppointments.some(appt =>
      areIntervalsOverlapping(
        { start: slot.start, end: slot.end },
        { start: new Date(appt.startISO), end: new Date(appt.endISO) },
        { inclusive: true },
      ),
    );
  });
}

/**
 * Formats a time slot for display, e.g. "09:00 - 09:30".
 */
export function formatSlot(slot: TimeSlot) {
  return `${format(slot.start, 'HH:mm')} - ${format(slot.end, 'HH:mm')}`;
}