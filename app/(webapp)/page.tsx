import { Github } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex grow-[1] flex-col items-center justify-center bg-gray-1 px-4">
      <div className="flex max-w-sm flex-col">
        <h1 className="mb-1 text-center text-2xl font-medium tracking-tighter text-gray-12 md:text-3xl">
          Farcaster Circle
        </h1>
        <p className="mb-4 text-center text-base leading-normal text-gray-11">
          Farcaster social circle interaction generator.
        </p>
        <div className="flex w-full flex-col gap-1">
          <a
            className="flex h-8 w-full items-center justify-center gap-1.5 rounded border border-gray-7 bg-gray-3 px-3 text-sm font-medium transition-colors hover:border-gray-8 hover:bg-gray-4 active:bg-gray-5"
            href="https://github.com/fiveoutofnine"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex size-4 w-4 items-center justify-center">
              <Github />
            </span>
            <span>@fiveoutofnine</span>
          </a>
        </div>
      </div>
    </main>
  );
}
