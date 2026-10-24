import 'server-only';
import { z } from 'zod';
import { ConfigError } from '@/lib/errors';

/**
 * PRIVATE server-side configuration. Never prefix these variables with NEXT_PUBLIC_
 * and never import this module from a Client Component (`server-only` enforces it).
 *
 * Validation is lazy (on first use) so `next build` works without secrets present.
 */
const serverEnvSchema = z
  .object({
    FIREBASE_ADMIN_PROJECT_ID: z.string().min(1),
    FIREBASE_ADMIN_CLIENT_EMAIL: z.string().optional(),
    FIREBASE_ADMIN_PRIVATE_KEY: z.string().optional(),
    HASH_SECRET: z.string().min(32, 'must be at least 32 characters'),
    /** Set automatically by the Firebase emulator suite; lets local dev run without a key. */
    FIRESTORE_EMULATOR_HOST: z.string().optional(),
  })
  .refine(
    (env) =>
      Boolean(env.FIRESTORE_EMULATOR_HOST) ||
      (Boolean(env.FIREBASE_ADMIN_CLIENT_EMAIL) && Boolean(env.FIREBASE_ADMIN_PRIVATE_KEY)),
    {
      path: ['FIREBASE_ADMIN_CLIENT_EMAIL', 'FIREBASE_ADMIN_PRIVATE_KEY'],
      message: 'required unless FIRESTORE_EMULATOR_HOST is set',
    },
  );

export interface ServerEnv {
  firebaseAdmin: {
    projectId: string;
    credentials: { clientEmail: string; privateKey: string } | null;
  };
  hashSecret: string;
}

let cached: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Report variable NAMES only. Never echo values.
    const names = [...new Set(parsed.error.issues.flatMap((i) => i.path.map(String)))];
    throw new ConfigError(`Invalid server configuration. Check: ${names.join(', ')}`);
  }
  const env = parsed.data;
  cached = {
    firebaseAdmin: {
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
      credentials:
        env.FIREBASE_ADMIN_CLIENT_EMAIL && env.FIREBASE_ADMIN_PRIVATE_KEY
          ? {
              clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
              // Env files store newlines as the two characters "\n".
              privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }
          : null,
    },
    hashSecret: env.HASH_SECRET,
  };
  return cached;
}
