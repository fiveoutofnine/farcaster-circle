export default function Page({ params: { fid } }: { params: { fid: string } }) {
  const title = `Share ${fid} | Farcaster Circle`;

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={`https://farcaster-circle.vercel.app/api/image?fid=${fid}`}
        />
        <meta name="fc:frame" content="vNext" />
        <meta
          name="fc:frame:image"
          content={`https://farcaster-circle.vercel.app/api/image?fid=${fid}`}
        />
        <meta name="fc:frame:button:1" content="Share Results" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta
          name="fc:frame:button:1:target"
          content={`https://warpcast.com/~/compose?text=${encodeURIComponent(`Here+are+my+closest+Farcaster+friends.+Click+the+frame+to+view+your+circles.
&embeds[]=https://farcaster-circle.vercel.app/share/${fid}`)}`}
        />
      </head>
    </html>
  );
}
