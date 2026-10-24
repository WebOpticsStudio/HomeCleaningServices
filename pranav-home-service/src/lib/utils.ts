type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

/** Escapes `<` so JSON can be embedded safely inside a <script> tag. */
export function safeJsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
