import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirebaseClientConfig } from './client-env';

/**
 * Firebase CLIENT SDK (modular). Browser-safe, public config only.
 *
 * The public website does not talk to Firestore from the browser: bookings go through a
 * Server Action. This module is the extension point for browser-side Firebase features
 * such as App Check, Authentication for an admin area, or Analytics. Nothing imports it
 * yet, so it adds nothing to the current JavaScript bundle.
 */
export function getFirebaseClientApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(getFirebaseClientConfig());
}
