/**
 * Minimal structured logger.
 *
 * PRIVACY RULE: never pass customer data (name, phone, email, address, instructions)
 * to the logger. Log booking IDs and error codes only.
 */
type LogContext = Record<string, string | number | boolean | null | undefined>;

function write(level: 'info' | 'warn' | 'error', message: string, context?: LogContext) {
  const line = JSON.stringify({ level, message, ...context, time: new Date().toISOString() });
  if (level === 'error') console.error(line);
  else console.warn(line);
}

export const logger = {
  info: (message: string, context?: LogContext) => write('info', message, context),
  warn: (message: string, context?: LogContext) => write('warn', message, context),
  error: (message: string, context?: LogContext) => write('error', message, context),
};
