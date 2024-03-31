import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // Read Frame `POST` request props
  // ---------------------------------------------------------------------------

  const { untrustedData } = await req.json();
  // Default to dwr.
  const fid = untrustedData?.fid ?? 3;

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
            <meta property="og:title" content="${title}">
            <meta property="og:image" content="${imageUrl}">
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:button:1" content="Share Results" />
            <meta name="fc:frame:button:1:action" content="link" />
            <meta
              name="fc:frame:button:1:target"
              content="https://warpcast.com/~/compose?text=${encodeURIComponent(`Here+are+my+closest+Farcaster+friends.+Click+the+frame+to+view+your+circles.
&embeds[]=https://farcaster-circle.vercel.app/share/${fid}`)}"
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
