import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { grayDark } from '@radix-ui/colors';
import { Redis } from '@upstash/redis';

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

const redis = new Redis({ url: process.env.UPSTASH_URL, token: process.env.UPSTASH_TOKEN });

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // Fonts
  // ---------------------------------------------------------------------------

  const robotoMono600 = fetch(
    new URL(
      '../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-600-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  // ---------------------------------------------------------------------------
  // Search params
  // ---------------------------------------------------------------------------

  // Read `fid` from search parameters and default to dwr (3).
  const fidParam = Number(req.nextUrl.searchParams.get('fid') ?? '3');
  const fid = Number.isNaN(fidParam) ? 3 : fidParam;

  // ---------------------------------------------------------------------------
  // Fetch data
  // ---------------------------------------------------------------------------

  // Try fetching execution ID from Redis.
  let executionId = await redis.get(`farcaster_circle:execution:${fid}`);
  if (!executionId) {
    const executionRes = await fetch('https://api.dune.com/api/v1/query/3576941/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Dune-API-Key': process.env.DUNE_API_KEY,
      },
      body: JSON.stringify({ query_parameters: { fid } }),
      next: { revalidate: 0 },
    });
    const execution = (await executionRes.json()) as { execution_id: string; state: string };
    await redis.set(`farcaster_circle:execution:${fid}`, execution.execution_id);
    executionId = execution.execution_id;
  }

  // Query execution.
  /* const res = await fetch(`https://api.dune.com/api/v1/execution/${executionId}/results?limit=50`, {
    headers: { 'X-Dune-API-Key': process.env.DUNE_API_KEY },
    next: { revalidate: 0 },
  });
  const data = await res.json();
  if (!data.is_execution_finished) {
    return new Response('Execution is not finished yet.', { status: 202 });
  }
  const rows = data.result.rows as {
    fid: number;
    fname: string;
    avatar_url: string | null;
    total_points: number;
  }[]; */

  // Filter out self. We don't need to sort because the API already returns a
  // sorted list.
  /* const friends = rows.filter((friend) => friend.fid !== fid);

  // Try to find self.
  const self = rows.find((friend) => friend.fid === fid); */

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  const WIDTH = 1320;
  const HEIGHT = 1320;
  /* const C0 = { r1: 216, r2: 0, size: 1 };
  const C1 = { r1: 144, r2: (C0.r1 + 144) / 2 + 32, size: 8 };
  const C2 = { r1: 128, r2: (C0.r1 + C1.r1 + 128) / 2 + 128, size: 16 };
  const C3 = { r1: 120, r2: (C0.r1 + C1.r1 + C2.r1 + 112) / 2 + 224, size: 24 }; */

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: grayDark.gray1,
        }}
      >
        bruh
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: 'Roboto_Mono_600', data: await robotoMono600, weight: 600 }],
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';
