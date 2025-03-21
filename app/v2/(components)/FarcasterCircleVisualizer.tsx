'use client';

import { useEffect, useState } from 'react';

import { Github, Users } from 'lucide-react';

export default function FarcasterCircleVisualizer() {
  const [fid, setFid] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [circleGenerated, setCircleGenerated] = useState<boolean>(false);

  // Detect Farcaster Frame context and get FID.
  useEffect(() => {
    const detectFarcasterContext = async () => {
      try {
        // Check if we're in a Farcaster Frame context
        // This is a simplified approach - in a real app, you'd use the Farcaster SDK

        // Method 1: Check for Farcaster in URL params (common in Frames)
        const urlParams = new URLSearchParams(window.location.search);
        const fidFromUrl = urlParams.get('fid');

        if (fidFromUrl) {
          setFid(fidFromUrl);
          setIsConnected(true);
          setIsLoading(false);
          return;
        }

        // Method 2: Check if we're in a Warpcast environment
        // This is a simplified check - in a real app, you'd use the Farcaster SDK
        const isWarpcast =
          typeof window !== 'undefined' &&
          (window.location.hostname.includes('warpcast') ||
            navigator.userAgent.includes('Warpcast'));

        if (isWarpcast) {
          // In a real app, you'd use the Farcaster SDK to get the user's FID
          // For now, we'll simulate having a FID in Warpcast
          const mockFid = '123456'; // This would be the actual FID from Warpcast
          setFid(mockFid);
          setIsConnected(true);
          setIsLoading(false);
          return;
        }

        // If we're not in a Farcaster context, just show the manual input
        setIsLoading(false);
      } catch (error) {
        console.error('Error detecting Farcaster context:', error);
        setIsLoading(false);
      }
    };

    detectFarcasterContext();
  }, []);

  const handleGenerateCircle = () => {
    setCircleGenerated(true);
  };

  const handleConnect = () => {
    if (fid.trim()) {
      setIsConnected(true);
    }
  };

  return (
    <div className="flex max-w-sm flex-col items-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-gray-6 bg-gray-3">
        <Users className="size-8 text-gray-11" />
      </div>

      <h1 className="mb-2 text-center text-2xl font-medium tracking-tighter text-gray-12 md:text-3xl">
        Farcaster Circle
      </h1>

      <p className="mb-6 text-center text-base leading-normal text-gray-11">
        See who engages with you most on Farcaster.
      </p>

      {isLoading ? (
        <div className="flex w-full flex-col gap-3">
          <div className="h-10 w-full animate-pulse rounded-full bg-gray-5"></div>
          <div className="h-9 w-full animate-pulse rounded-full bg-gray-5"></div>
        </div>
      ) : circleGenerated ? (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative flex size-64 items-center justify-center">
            {/* Outer circle */}
            <div className="absolute size-64 rounded-full border-2 border-purple-300 opacity-30"></div>
            {/* Middle circle */}
            <div className="absolute size-48 rounded-full border-2 border-purple-400 opacity-50"></div>
            {/* Inner circle */}
            <div className="absolute size-32 rounded-full border-2 border-purple-500 opacity-70"></div>
            {/* User in center */}
            <div className="absolute flex size-16 items-center justify-center rounded-full bg-purple-600">
              <span className="font-medium text-white">You</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-11">
            Your Farcaster social circle visualization.
          </p>
          <button
            className="mt-2 flex h-9 w-full items-center justify-center rounded-full border border-gray-7 bg-gray-3 px-3 text-sm font-medium transition-colors hover:border-gray-8 hover:bg-gray-4 active:bg-gray-5"
            onClick={() => setCircleGenerated(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3">
          {isConnected ? (
            <button
              className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 active:bg-purple-700"
              onClick={handleGenerateCircle}
            >
              Generate Your Circle
            </button>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter your Farcaster FID"
                  value={fid}
                  onChange={(e) => setFid(e.target.value)}
                  className="h-10 flex-1 rounded-l-full border border-gray-7 bg-gray-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  className="h-10 rounded-r-full bg-gray-4 px-4 text-sm font-medium text-gray-12 transition-colors hover:bg-gray-5 active:bg-gray-6"
                  onClick={handleConnect}
                >
                  Connect
                </button>
              </div>
              <button className="flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-purple-500 px-4 text-sm font-medium text-white opacity-50 transition-colors hover:bg-purple-600 active:bg-purple-700">
                Generate Your Circle
              </button>
            </div>
          )}

          <a
            className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-gray-7 bg-gray-3 px-3 text-sm font-medium transition-colors hover:border-gray-8 hover:bg-gray-4 active:bg-gray-5"
            href="https://github.com/fiveoutofnine/farcaster-circle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex size-4 items-center justify-center">
              <Github className="size-4" />
            </span>
            <span>View on GitHub</span>
          </a>
        </div>
      )}

      {!isLoading && !circleGenerated && (
        <p className="mt-4 text-center text-sm text-gray-10">
          {isConnected
            ? `Connected as FID: ${fid}`
            : 'Connect your Farcaster account to generate your circle'}
        </p>
      )}
    </div>
  );
}
