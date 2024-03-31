import type { Metadata, Viewport } from 'next';
import { Fragment } from 'react';

import './globals.css';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    template: '%s | Farcaster Circle',
    default: 'Farcaster Circle',
  },
  description: 'Social circle interaction generator.',
  keywords: ['farcaster', 'frame', 'ethereum', 'social'],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Farcaster Circle',
    description: 'Social circle interaction generator.',
    siteName: 'farcaster-circle',
    url: 'https://farcaster-circle.vercel.app',
    locale: 'en_US',
    images: ['https://farcaster-circle.vercel.app/static/og/home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@fiveoutofnine',
    images: ['https://farcaster-circle.vercel.app/static/og/home.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image:aspect_ratio': '1:1',
    'fc:frame:image': 'https://farcaster-circle.vercel.app/static/og/home.png',
    'fc:frame:post_url': `${process.env.BASE_URL}/api/generate`,
    'fc:frame:button:1': 'See Your Circle',
    'fc:frame:button:1:action': 'post',
  },
};

export const viewport: Viewport = {
  themeColor: '#141414',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
