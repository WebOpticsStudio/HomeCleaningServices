import { z } from 'zod';
import { ConfigError } from '@/lib/errors';

/**
 * PUBLIC Firebase web configuration.
 *
 * These values identify your Firebase project and are shipped to every browser by design.
 * They are NOT secrets. Access control comes from Firestore Security Rules (see
 * `firestore.rules`), not from hiding these values.
 *
 * Each variable must be referenced literally (`process.env.NEXT_PUBLIC_...`) so that
 * Next.js can inline it into the client bundle.
 */
const clientConfigSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().min(1),
  messagingSenderId: z.string().min(1),
  appId: z.string().min(1),
});

export type FirebaseClientConfig = z.infer<typeof clientConfigSchema>;

export function getFirebaseClientConfig(): FirebaseClientConfig {
  const parsed = clientConfigSchema.safeParse({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new ConfigError(`Invalid public Firebase configuration. Check: ${missing}`);
  }
  return parsed.data;
}
