/**
 * A service offered by a barber (e.g., haircut, beard trim).
 */
export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  priceCents: number;
};

/**
 * A professional who offers services on a weekly schedule.
 * `weeklySchedule` maps 0-6 (Sun..Sat) to working hours in HH:mm format or `null` for day off.
 */
export type Barber = {
  id: string;
  name: string;
  avatarUrl: string;
  services: Service[];
  weeklySchedule: Record<number, { start: string; end: string } | null>; // 0-6 Sun..Sat in HH:mm
};

/**
 * A scheduled appointment between a customer and a barber.
 */
export type Appointment = {
  id: string;
  barberId: string;
  serviceId: string;
  startISO: string;
  endISO: string;
  customerName: string;
};