import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

/**
 * Expo bootstrap entry.
 * Ensures the environment is initialized and registers the `App` component
 * for Expo Go and native builds.
 */
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
