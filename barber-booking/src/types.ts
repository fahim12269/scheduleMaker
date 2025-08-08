export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  priceCents: number;
};

export type Barber = {
  id: string;
  name: string;
  avatarUrl: string;
  services: Service[];
  weeklySchedule: Record<number, { start: string; end: string } | null>; // 0-6 Sun..Sat in HH:mm
};

export type Appointment = {
  id: string;
  barberId: string;
  serviceId: string;
  startISO: string;
  endISO: string;
  customerName: string;
};