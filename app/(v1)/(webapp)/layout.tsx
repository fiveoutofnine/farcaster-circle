import type { Metadata } from 'next';
import { Fragment } from 'react';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://farcaster-circle.vercel.app/static/og/home.png',
    'fc:frame:post_url': `${process.env.BASE_URL}/api/generate`,
    'fc:frame:button:1': 'See Your Circle',
    'fc:frame:button:1:action': 'post',
  },
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
