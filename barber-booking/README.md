# Barber Booking (Expo + React Native)

A simple barber shop booking app built with Expo, React Native, and React Navigation. Users can browse barbers, choose services, pick a date, select an available time, and confirm bookings. Appointments are persisted locally.

## Features
- Browse a list of demo barbers and services
- Date picker and responsive grid of available time slots
- Confirm bookings and view upcoming appointments
- Local persistence via MMKV (with web/in-memory fallbacks)

## Tech Stack
- Expo (React Native)
- React Navigation (Native Stack + Bottom Tabs)
- Zustand for state management
- date-fns for date utilities
- react-native-calendars for the calendar UI
- MMKV/localStorage for persistence

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run start
   # or target platforms
   npm run web
   npm run android
   npm run ios
   ```

## Project Structure
- `App.tsx`: App root, providers, and `RootNavigator` host
- `index.ts`: Expo bootstrap entry
- `src/navigation/RootNavigator.tsx`: Stack and tabs configuration, route types
- `src/screens/`: App pages
  - `HomeScreen.tsx`: List barbers
  - `BarberScreen.tsx`: Select service, date, and time slot
  - `ConfirmScreen.tsx`: Review and confirm booking
  - `AppointmentsScreen.tsx`: Manage upcoming appointments
- `src/components/`: Reusable UI components
  - `BarberCard.tsx`, `ServicePicker.tsx`, `DayCalendar.tsx`, `TimeSlotGrid.tsx`
- `src/lib/availability.ts`: Slot generation and conflict detection
- `src/store/appStore.ts`: Zustand store with persistence
- `src/storage/`: Storage adapters (`mmkv.ts`, `mmkv.web.ts`)
- `src/types.ts`: Domain types

## Notes
- Demo data is seeded on first run and persisted under the key `app_state_v1`.
- When MMKV is unavailable (e.g., Expo Go, web), the app falls back to in-memory or `localStorage`.

## License
MIT