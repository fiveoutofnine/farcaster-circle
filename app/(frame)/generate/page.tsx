export default function Page() {
  const title = 'Generate | Farcaster Circle';

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://farcaster-circle.vercel.app/api/image?fid=${fid}"
        />
        <meta name="fc:frame" content="vNext" />
        <meta
          name="fc:frame:image"
          content="https://farcaster-circle.vercel.app/api/image?fid=${fid}"
        />
        <meta name="fc:frame:post_url" content="" />
        <meta name="fc:frame:button:1" content="Easy" />
        <meta name="fc:frame:button:2" content="Intermediate" />
        <meta name="fc:frame:button:3" content="Advanced" />
      </head>
    </html>
  );
}
