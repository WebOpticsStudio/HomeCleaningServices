export interface NavItem {
  label: string;
  href: string;
}

/** An image served from `/public` (or a configured remote host). */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ActionErrorCode =
  'VALIDATION_ERROR' | 'RATE_LIMITED' | 'SERVICE_UNAVAILABLE' | 'SERVER_ERROR';

export interface ActionError {
  code: ActionErrorCode;
  message: string;
  /** Field name -> messages, present for VALIDATION_ERROR. */
  fieldErrors?: Record<string, string[]>;
}

/** Return type for Server Actions. Errors are values, never thrown across the network boundary. */
export type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: ActionError };
