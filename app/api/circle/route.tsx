import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { grayDark } from '@radix-ui/colors';

export async function GET(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // Search params
  // ---------------------------------------------------------------------------

  // Read `fid` from search parameters and default to dwr (3).
  const fidParam = Number(req.nextUrl.searchParams.get('fid') ?? '3');
  const fid = Number.isNaN(fidParam) ? 3 : fidParam;

  // ---------------------------------------------------------------------------
  // Fetch data
  // ---------------------------------------------------------------------------

  // Query data.
  const res = await fetch(
    `https://api.dune.com/api/v1/query/3585040/results?limit=50&columns=friend_avatar_url,friend_fid&filters=fid=${fid}`,
    { headers: { 'X-Dune-API-Key': process.env.DUNE_API_KEY } },
  );
  const data = await res.json();
  if (!data.is_execution_finished) {
    return new Response('Execution is not finished yet.', { status: 202 });
  }
  const rows = data.result.rows as {
    friend_fid: number;
    friend_avatar_url: string | null;
  }[];

  // Filter out self. We don't need to sort because the API already returns a
  // sorted list.
  const friends = rows.filter((friend) => friend.friend_fid !== fid);

  // Try to find self.
  const self = rows.find((friend) => friend.friend_fid === fid);

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  const WIDTH = 1320;
  const HEIGHT = 1320;
  const C0 = { r1: 216, r2: 0, size: 1 };
  const C1 = { r1: 144, r2: (C0.r1 + 144) / 2 + 32, size: 8 };
  const C2 = { r1: 128, r2: (C0.r1 + C1.r1 + 128) / 2 + 128, size: 16 };
  const C3 = { r1: 120, r2: (C0.r1 + C1.r1 + C2.r1 + 112) / 2 + 224, size: 24 };

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
        {/* Middle circle positioned at (600 - 64, 600 - 64) */}
        <div
          style={{
            display: 'flex',
            borderRadius: '100%',
            overflow: 'hidden',
            border: '6px solid',
            height: `${C0.r1}px`,
            width: `${C0.r1}px`,
            left: `${(WIDTH - C0.r1) / 2}px`,
            top: `${(HEIGHT - C0.r1) / 2}px`,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            background: grayDark.gray2,
            borderColor: grayDark.gray6,
            color: grayDark.gray12,
            fontSize: '32px',
          }}
        >
          {self && self.friend_avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={self.friend_avatar_url} alt={`${fid}`} width={C0.r1} height={C0.r1} />
          ) : (
            fid
          )}
        </div>
        {/* 1st circle */}
        {friends.slice(0, C1.size).map(({ friend_fid, friend_avatar_url }, i) => {
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                borderRadius: '100%',
                overflow: 'hidden',
                border: '6px solid',
                height: `${C1.r1}px`,
                width: `${C1.r1}px`,
                left: `${(WIDTH - C1.r1) / 2 + C1.r2 * Math.cos((i * 2 * Math.PI) / C1.size)}px`,
                top: `${(HEIGHT - C1.r1) / 2 + C1.r2 * Math.sin((i * 2 * Math.PI) / C1.size)}px`,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                background: grayDark.gray2,
                borderColor: grayDark.gray6,
                color: grayDark.gray12,
                fontSize: '24px',
              }}
            >
              {friend_avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={friend_avatar_url} alt={`${fid}`} width={C1.r1} height={C1.r1} />
              ) : (
                friend_fid
              )}
            </div>
          );
        })}
        {/* 2nd circle */}
        {friends.slice(C1.size, C1.size + C2.size).map(({ friend_fid, friend_avatar_url }, i) => {
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                borderRadius: '100%',
                overflow: 'hidden',
                border: '6px solid',
                height: `${C2.r1}px`,
                width: `${C2.r1}px`,
                left: `${(WIDTH - C2.r1) / 2 + C2.r2 * Math.cos((i * 2 * Math.PI) / C2.size)}px`,
                top: `${(HEIGHT - C2.r1) / 2 + C2.r2 * Math.sin((i * 2 * Math.PI) / C2.size)}px`,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                background: grayDark.gray2,
                borderColor: grayDark.gray6,
                color: grayDark.gray12,
                fontSize: '24px',
              }}
            >
              {friend_avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={friend_avatar_url} alt={`${fid}`} width={C2.r1} height={C2.r1} />
              ) : (
                friend_fid
              )}
            </div>
          );
        })}
        {/* 3rd circle */}
        {friends
          .slice(C1.size + C2.size, C1.size + C2.size + C3.size)
          .map(({ friend_fid, friend_avatar_url }, i) => {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  borderRadius: '100%',
                  overflow: 'hidden',
                  border: '6px solid',
                  height: `${C3.r1}px`,
                  width: `${C3.r1}px`,
                  left: `${(WIDTH - C3.r1) / 2 + C3.r2 * Math.cos((i * 2 * Math.PI) / C3.size)}px`,
                  top: `${(HEIGHT - C3.r1) / 2 + C3.r2 * Math.sin((i * 2 * Math.PI) / C3.size)}px`,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: grayDark.gray2,
                  borderColor: grayDark.gray6,
                  color: grayDark.gray12,
                  fontSize: '24px',
                }}
              >
                {friend_avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={friend_avatar_url} alt={`${fid}`} width={C3.r1} height={C3.r1} />
                ) : (
                  friend_fid
                )}
              </div>
            );
          })}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            left: 0,
            bottom: 0,
            background: grayDark.gray2,
            borderTop: '4px solid',
            borderRight: '4px solid',
            borderColor: grayDark.gray6,
            borderTopRightRadius: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '12px',
            paddingTop: '12px',
            color: grayDark.gray12,
            fontSize: '28px',
          }}
        >
          {self?.friend_fid ?? fid}&apos;s Farcaster Circle
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const maxDuration = 300;
