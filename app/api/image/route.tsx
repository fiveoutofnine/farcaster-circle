import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { grayDark } from '@radix-ui/colors';

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // Fonts
  // ---------------------------------------------------------------------------

  const robotoMono400 = fetch(
    new URL(
      '../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  // ---------------------------------------------------------------------------
  // Search params
  // ---------------------------------------------------------------------------

  // Read `fid` from search parameters and default to dwr (3).
  const fidParam = Number(req.nextUrl.searchParams.get('fid') ?? '3');
  const fid = Number.isNaN(fidParam) ? 3 : fidParam;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: grayDark.gray1,
        }}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '6px solid',
            borderColor: grayDark.gray6,
          }}
        >
          {fid}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
      fonts: [{ name: 'Roboto_Mono_400', data: await robotoMono400, weight: 400 }],
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';
