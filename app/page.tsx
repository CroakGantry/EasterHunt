import { HuntBoard } from "@/components/hunt-board";

export default function Home() {
  return (
    <main className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_45%),linear-gradient(180deg,#bdd4ef_0%,#d6e5fb_45%,#ebddfb_100%)]" />
      <div className="pointer-events-none absolute -left-16 top-20 h-48 w-48 rounded-full bg-[#cdbff8]/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#f3c9dd]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#ffffff]/60 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[#4c426e] md:text-6xl">
            Easter Treasure Hunt
          </h1>
          <p className="mt-6 text-lg font-medium text-[#675d8e] md:text-xl">
            Find nine passwords to unlock nine clues.
          </p>
          <p className="mt-2 text-lg font-medium text-[#675d8e] md:text-xl">
            Find them all to be rewarded with a magnificent prize!
          </p>
        </header>

        <div className="mt-12">
          <HuntBoard />
        </div>
      </div>
    </main>
  );
}
