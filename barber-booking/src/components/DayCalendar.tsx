import React, { useMemo } from 'react';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

/**
 * Props for `DayCalendar`.
 * - `selectedDate`: Currently selected date.
 * - `onChange`: Callback invoked with the new date when a day is pressed.
 */
type Props = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

/**
 * Single-day calendar highlighting the selected date.
 */
export default function DayCalendar({ selectedDate, onChange }: Props) {
  const marked = useMemo(
    () => ({ [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: '#111827' } }),
    [selectedDate],
  );
  return (
    <Calendar
      markedDates={marked}
      onDayPress={(d: any) => onChange(new Date(d.dateString))}
      theme={{
        selectedDayBackgroundColor: '#111827',
        todayTextColor: '#111827',
        arrowColor: '#111827',
      }}
    />
  );
}