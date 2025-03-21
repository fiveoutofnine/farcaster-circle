import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import clsx from 'clsx';

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
    creatorId: '1269561030272643076',
    images: ['https://farcaster-circle.vercel.app/static/og/home.png'],
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
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({ subsets: ['latin'] });

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: 'var(--gray1)' }}>
      <body className={clsx(inter.className, 'relative flex min-h-screen w-full flex-col')}>
        {children}
      </body>
    </html>
  );
}
