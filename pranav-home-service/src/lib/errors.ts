import { z } from 'zod';
import type { ActionError, ActionErrorCode, ActionResult } from '@/types';
import { siteConfig } from '@/config/site';
import { logger } from '@/lib/logger';

/** An error whose message is safe to show to end users. */
export class AppError extends Error {
  readonly code: ActionErrorCode;

  constructor(code: ActionErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'AppError';
    this.code = code;
  }
}

/** Missing or invalid environment configuration. The message never contains values. */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

const UNAVAILABLE_MESSAGE = `Booking is temporarily unavailable. Please call us on ${siteConfig.contact.phone} and we will take your booking over the phone.`;

/**
 * Converts any thrown value into a safe, serializable failure result.
 * This is the single place where server errors are logged and mapped to user messages.
 */
export function toActionError(error: unknown): Extract<ActionResult, { ok: false }> {
  return { ok: false, error: mapError(error) };
}

function mapError(error: unknown): ActionError {
  if (error instanceof z.ZodError) {
    return {
      code: 'VALIDATION_ERROR',
      message: 'Please check the highlighted fields and try again.',
      fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[]>,
    };
  }
  if (error instanceof AppError) {
    return { code: error.code, message: error.message };
  }
  if (error instanceof ConfigError) {
    logger.error('Configuration error', { reason: error.message });
    return { code: 'SERVICE_UNAVAILABLE', message: UNAVAILABLE_MESSAGE };
  }
  logger.error('Unhandled server error', {
    name: error instanceof Error ? error.name : 'unknown',
    message: error instanceof Error ? error.message : 'non-error thrown',
  });
  return { code: 'SERVER_ERROR', message: UNAVAILABLE_MESSAGE };
}
