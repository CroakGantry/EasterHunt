"use client";

import { type FormEvent } from "react";
import type { ClueDefinition } from "@/lib/clues";

type ClueCardProps = {
  clue: ClueDefinition;
  errorMessage?: string;
  inputValue: string;
  isUnlocked: boolean;
  onInputChange: (nextValue: string) => void;
  onUnlock: () => void;
};

export function ClueCard({
  clue,
  errorMessage,
  inputValue,
  isUnlocked,
  onInputChange,
  onUnlock,
}: ClueCardProps) {
  const inputId = `${clue.id}-password`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUnlock();
  }

  return (
    <section className="card-shell rounded-[2rem]">
      <div className={`card-rotator ${isUnlocked ? "is-unlocked" : ""}`}>
        <div
          aria-hidden={isUnlocked}
          className="card-face rounded-[2rem] border border-white/70 bg-white/65 p-6 backdrop-blur-sm"
        >
          {!isUnlocked ? (
            <>
              <CardHeader title={clue.title} />

              <form className="flex h-full flex-col" onSubmit={handleSubmit}>
                <label
                  htmlFor={inputId}
                  className="mb-3 block text-sm font-medium text-[#6e648f]"
                >
                  Password for {clue.title}
                </label>

                <input
                  id={inputId}
                  type="text"
                  value={inputValue}
                  onChange={(event) => {
                    onInputChange(event.target.value);
                  }}
                  className="w-full rounded-2xl border border-[#d7cff5] bg-white/90 px-4 py-3 text-base text-[#463d6a] outline-none transition focus:border-[#9f8ef0] focus:ring-4 focus:ring-[#c7bef8]/70"
                  placeholder="Enter password"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#8c7bd9,#6d5ac1)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(105,94,156,0.28)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-[#c7bef8]/70"
                >
                  Unlock {clue.title}
                </button>

                <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(243,247,255,0.95),rgba(231,224,255,0.95))] p-4 shadow-[inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-8px_16px_rgba(173,153,228,0.16)]">
                  <p className="text-sm leading-6 text-[#7e75a3]">
                    Enter the correct password to reveal the hidden clue on the
                    other side of this card.
                  </p>
                  {errorMessage ? (
                    <p className="mt-3 text-sm font-medium text-[#a64f7c]">
                      {errorMessage}
                    </p>
                  ) : null}
                </div>
              </form>
            </>
          ) : null}
        </div>

        <div
          aria-hidden={!isUnlocked}
          className="card-face card-face-back rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(241,235,255,0.95),rgba(219,232,255,0.95))] p-6 backdrop-blur-sm"
        >
          {isUnlocked ? (
            <>
              <CardHeader title={clue.title} />

              <div className="mt-4 flex h-full flex-col rounded-[1.75rem] bg-white/70 p-4 shadow-[inset_0_2px_0_rgba(255,255,255,0.95),0_16px_30px_rgba(105,94,156,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f8ac0]">
                  Video clue for {clue.title}
                </p>
                <video
                  className="mt-4 aspect-video w-full rounded-[1.25rem] bg-[#cbdcf1] object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]"
                  src={clue.videoSrc}
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support this clue video.
                </video>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CardHeader({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f8ac0]">
          Secret Card
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#554a7c]">{title}</h2>
      </div>
      <div className="h-12 w-12 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(212,199,251,0.9))] shadow-[inset_-4px_-4px_12px_rgba(160,137,214,0.24),inset_4px_4px_12px_rgba(255,255,255,0.95)]" />
    </div>
  );
}
