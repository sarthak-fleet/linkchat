export default function SlugLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent" />

      {/* Top bar skeleton */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 animate-pulse" />
            <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-full bg-white/5 animate-pulse" />
            <div className="h-8 w-16 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        {/* Profile card skeleton */}
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-10">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-5 h-24 w-24 rounded-full bg-white/10 animate-pulse" />
            <div className="mx-auto h-3 w-24 rounded bg-white/10 animate-pulse" />
            <div className="mx-auto mt-4 h-8 w-48 rounded bg-white/10 animate-pulse" />
            <div className="mx-auto mt-4 h-4 w-72 rounded bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* Links section skeleton */}
        <div className="mt-8 w-full">
          <div className="h-3 w-12 rounded bg-white/10 animate-pulse" />
          <div className="mt-2 h-6 w-32 rounded bg-white/10 animate-pulse" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Projects section skeleton */}
        <div className="mt-10 w-full">
          <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
          <div className="mt-2 h-6 w-36 rounded bg-white/10 animate-pulse" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-56 rounded-3xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
