export default function Page({ params: { fid } }: { params: { fid: string } }) {
  const title = `Share ${fid} | Farcaster Circle`;

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={`${process.env.BASE_URL}/api/image?fid=${fid}`} />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={`${process.env.BASE_URL}/api/image?fid=${fid}`} />
        <meta name="fc:frame:post_url" content={`${process.env.BASE_URL}/api/generate`} />
        <meta name="fc:frame:button:1" content="See Your Circle" />
        <meta name="fc:frame:button:1:action" content="post" />
      </head>
    </html>
  );
}
