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
          <p className="mb-4 inline-flex rounded-full border border-white/70 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#7a72ab] shadow-[0_10px_30px_rgba(130,113,194,0.15)]">
            Easter Surprise
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#4c426e] md:text-6xl">
            Easter Chocolate Hunt
          </h1>
          <p className="mt-6 text-lg font-medium text-[#675d8e] md:text-xl">
            Find the six passwords to unlock six clues.
          </p>
          <p className="mt-2 text-lg font-medium text-[#675d8e] md:text-xl">
            Find them all and you will be rewarded with a magnificent prize!
          </p>
        </header>

        <section className="relative mt-12 rounded-[2.5rem] border border-white/75 bg-white/35 p-5 shadow-[0_28px_70px_rgba(90,80,143,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur md:p-8">
          <HuntBoard />
        </section>
      </div>
    </main>
  );
}
