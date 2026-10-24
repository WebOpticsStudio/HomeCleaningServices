import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        background: '#0f6e7d',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
      <div style={{ marginTop: 28, fontSize: 38, color: '#f6c945' }}>{siteConfig.tagline}</div>
    </div>,
    size,
  );
}
