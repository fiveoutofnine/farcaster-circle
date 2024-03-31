import { type NextRequest, NextResponse } from 'next/server';

import { Redis } from '@upstash/redis';

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

const redis = new Redis({ url: process.env.UPSTASH_URL, token: process.env.UPSTASH_TOKEN });

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // Read Frame `POST` request props
  // ---------------------------------------------------------------------------

  const { untrustedData } = await req.json();
  // Default to dwr.
  const fid = untrustedData?.fid ?? 3;

  // ---------------------------------------------------------------------------
  // Check execution ID
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
    });
    const execution = (await executionRes.json()) as { execution_id: string; state: string };
    await redis.set(`farcaster_circle:execution:${fid}`, execution.execution_id);
    executionId = execution.execution_id;
  }
  const res = await fetch(`https://api.dune.com/api/v1/execution/${executionId}/status`, {
    headers: { 'X-Dune-API-Key': process.env.DUNE_API_KEY },
  });
  const data = await res.json();
  if (!data.is_execution_finished) {
    return new NextResponse(
      `<!DOCTYPE html>
        <html>
          <head>
              <title>Loading... | Farcaster Circle</title>
              <meta property="og:title" content="Loading... | Farcaster Circle" />
              <meta property="og:image" content="https://farcaster-circle.vercel.app/static/og/loading.png" />
              <meta name="fc:frame" content="vNext" />
              <meta name="fc:frame:image" content="https://farcaster-circle.vercel.app/static/og/loading.png" />
              <meta name="fc:frame:image:aspect_ratio" content="1:1" />
              <meta name="fc:frame:post_url" content="${process.env.BASE_URL}/api/generate" />
              <meta name="fc:frame:button:1" content="Refresh" />
              <meta name="fc:frame:button:1:action" content="post" />
          </head>
        </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      },
    );
  }

  // ---------------------------------------------------------------------------
  // Return frame
  // ---------------------------------------------------------------------------

  const title = 'Generate | Farcaster Circle';
  const imageUrl = `${process.env.BASE_URL}/api/image?fid=${fid}`;

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
            <title>${title}</title>
            <meta property="og:title" content="${title}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta name="fc:frame" content="vNext" />
            <meta name="fc:frame:image" content="${imageUrl}" />
            <meta name="fc:frame:image:aspect_ratio" content="1:1" />
            <meta name="fc:frame:button:1" content="Share Results" />
            <meta name="fc:frame:button:1:action" content="link" />
            <meta
              name="fc:frame:button:1:target"
              content="https://warpcast.com/~/compose?text=${encodeURIComponent('Here are my closest Farcaster friends. Click the frame to view your circles.')}&embeds[]=${encodeURIComponent(`https://farcaster-circle.vercel.app/circle/${fid}`)}"
            />
        </head>
      </html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    },
  );
}

export const GET = POST;

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const dynamic = 'force-dynamic';
