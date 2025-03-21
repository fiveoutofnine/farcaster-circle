import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the client component.
const FarcasterCircleVisualizer = dynamic(
  () => import('./(components)/farcaster-circle-visualizer'),
  { ssr: false },
);

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const BASE_URL = process.env.BASE_URL ?? 'https://farcaster-circle.vercel.app';
const frame = {
  version: 'next',
  imageUrl: `${BASE_URL}/static/og/home-3x2.png`,
  button: {
    title: 'See Your Circle',
    action: {
      type: 'launch_frame',
      name: 'Farcaster Circle',
      url: `${BASE_URL}/v2`,
      splashImageUrl: 'https://fiveoutofnine.com/images/apple-touch-icon.png',
      splashBackgroundColor: '#000',
    },
  },
};

export function generateMetadata(): Metadata {
  return {
    title: 'Farcaster Circle',
    description: 'Farcaster social circle interaction generator.',
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page() {
  return (
    <main className="flex grow-[1] flex-col items-center justify-center bg-gray-1 px-4">
      <FarcasterCircleVisualizer />
    </main>
  );
}
