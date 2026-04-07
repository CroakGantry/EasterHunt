"use client";

import { type FormEvent, type ReactNode } from "react";
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
          className="card-face rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(236,244,255,0.96),rgba(223,237,252,0.96))] p-6 backdrop-blur-sm"
        >
          {!isUnlocked ? (
            <CardFaceLayout faceTestId="locked-face-layout" title={clue.title}>
              <div className="flex h-full items-center justify-center">
                <form
                  className="w-full max-w-[17rem]"
                  onSubmit={handleSubmit}
                >
                  <input
                    id={inputId}
                    type="text"
                    value={inputValue}
                    onChange={(event) => {
                      onInputChange(event.target.value);
                    }}
                    className="w-full rounded-2xl border border-[#c5d9ee] bg-white/90 px-4 py-3 text-center text-base text-[#3d4f66] outline-none transition focus:border-[#6ba3d6] focus:ring-4 focus:ring-[#b8d4f0]/70"
                    placeholder="Enter password"
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#8bbee8,#5a9fd4)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(74,132,188,0.32)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-[#b8d4f0]/70"
                  >
                    Unlock {clue.title}
                  </button>

                  {errorMessage ? (
                    <p className="mt-4 text-center text-sm font-medium text-[#a64f7c]">
                      {errorMessage}
                    </p>
                  ) : null}
                </form>
              </div>
            </CardFaceLayout>
          ) : null}
        </div>

        <div
          aria-hidden={!isUnlocked}
          className="card-face card-face-back flex flex-col rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(236,244,255,0.96),rgba(223,237,252,0.96))] p-6 backdrop-blur-sm"
        >
          {isUnlocked ? (
            <CardFaceLayout faceTestId="unlocked-face-layout" title={clue.title}>
              <div className="flex h-full items-center justify-center">
                <video
                  className="aspect-square w-full max-w-[17rem] rounded-[1.25rem] bg-[#cbdcf1] object-contain shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]"
                  src={clue.videoSrc}
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support this clue video.
                </video>
              </div>
            </CardFaceLayout>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CardFaceLayout({
  children,
  faceTestId,
  title,
}: {
  children: ReactNode;
  faceTestId: string;
  title: string;
}) {
  return (
    <div
      className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-4"
      data-testid={faceTestId}
    >
      <CardHeader title={title} />
      <div className="min-h-0" data-testid="card-body">
        {children}
      </div>
    </div>
  );
}

function parseClueNumber(title: string): string | null {
  const match = /^Clue\s+(\d+)$/i.exec(title.trim());
  return match ? match[1] : null;
}

function CardHeader({ title }: { title: string }) {
  const clueNumber = parseClueNumber(title);

  return (
    <div
      className="flex items-start justify-between gap-4"
      data-testid="card-header-row"
    >
      <div>
        <h2
          className="text-2xl font-semibold text-[#415a78]"
          {...(clueNumber ? { "aria-label": title } : {})}
        >
          {clueNumber ? <span aria-hidden="true">Clue</span> : title}
        </h2>
      </div>
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(190,220,248,0.92))] shadow-[inset_-4px_-4px_12px_rgba(100,150,200,0.22),inset_4px_4px_12px_rgba(255,255,255,0.95)]"
        aria-hidden={clueNumber ? true : undefined}
      >
        {clueNumber ? (
          <span className="text-lg font-semibold tabular-nums tracking-tight text-[#415a78]">
            {clueNumber}
          </span>
        ) : null}
      </div>
    </div>
  );
}
