import 'server-only';
import { cert, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getServerEnv } from './server-env';

/**
 * Firebase ADMIN SDK. Server-only: it bypasses Firestore Security Rules and uses a
 * service-account credential, so it must never reach the browser.
 */
export function getAdminApp(): App {
  if (getApps().length > 0) return getApp();

  const { projectId, credentials } = getServerEnv().firebaseAdmin;
  return initializeApp(
    credentials ? { projectId, credential: cert({ projectId, ...credentials }) } : { projectId }, // emulator mode: no credential needed
  );
}
