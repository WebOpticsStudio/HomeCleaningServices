import { siteConfig } from '@/config/site';

/** Converts user-entered phone numbers to E.164-ish form (`+<digits>`). */
export function normalizePhone(raw: string): string {
  let value = raw.trim().replace(/[\s\-().]/g, '');
  if (value.startsWith('00')) value = `+${value.slice(2)}`;
  if (!value.startsWith('+')) {
    const digits = value.replace(/^0+/, '');
    value = digits.length === 10 ? `${siteConfig.defaultCountryCode}${digits}` : `+${digits}`;
  }
  return value;
}

export function isValidPhone(raw: string): boolean {
  const phone = normalizePhone(raw);
  if (phone.startsWith('+91')) return /^\+91[6-9][0-9]{9}$/.test(phone);
  return /^\+[1-9][0-9]{9,14}$/.test(phone);
}

/** Collapses internal whitespace so "A   B" and "A B" are treated alike. */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
