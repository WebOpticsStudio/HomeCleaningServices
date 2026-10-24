'use client';

/** Last-resort boundary that replaces the root layout, so it carries its own <html>. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          color: '#0e2f36',
        }}
      >
        <h1>Something went wrong</h1>
        <p>Please try again in a moment.</p>
        <button
          type="button"
          onClick={reset}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
