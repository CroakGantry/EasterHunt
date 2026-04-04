"use client";

import { useState, useSyncExternalStore } from "react";
import { ClueCard } from "@/components/clue-card";
import { clues } from "@/lib/clues";

const STORAGE_KEY = "easter-hunt-unlocked-cards-v3";
const STORAGE_EVENT = "easter-hunt-storage-change";

function parseUnlockedIdsSnapshot(snapshot: string) {
  if (!snapshot) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(snapshot);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string"
    );
  } catch {
    return [];
  }
}

function readUnlockedIdsSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return "[]";
    }

    return storedValue;
  } catch {
    return "[]";
  }
}

function subscribeToUnlockedIds(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function writeUnlockedIdsToStorage(unlockedIds: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // If storage is unavailable, keep the UI working without persistence.
  }
}

export function HuntBoard() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const unlockedIdsSnapshot = useSyncExternalStore(
    subscribeToUnlockedIds,
    readUnlockedIdsSnapshot,
    () => "[]"
  );
  const unlockedIds = parseUnlockedIdsSnapshot(unlockedIdsSnapshot);

  function unlockClue(clueId: string, password: string) {
    const currentValue = values[clueId]?.trim() ?? "";

    if (currentValue !== password) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [clueId]: "That password is not quite right yet.",
      }));
      return;
    }

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[clueId];
      return nextErrors;
    });

    setValues((currentValues) => ({
      ...currentValues,
      [clueId]: "",
    }));

    if (!unlockedIds.includes(clueId)) {
      writeUnlockedIdsToStorage([...unlockedIds, clueId]);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clues.map((clue) => (
        <ClueCard
          key={clue.id}
          clue={clue}
          errorMessage={errors[clue.id]}
          inputValue={values[clue.id] ?? ""}
          isUnlocked={unlockedIds.includes(clue.id)}
          onInputChange={(nextValue) => {
            setValues((currentValues) => ({
              ...currentValues,
              [clue.id]: nextValue,
            }));
            setErrors((currentErrors) => {
              if (!currentErrors[clue.id]) {
                return currentErrors;
              }

              const nextErrors = { ...currentErrors };
              delete nextErrors[clue.id];
              return nextErrors;
            });
          }}
          onUnlock={() => {
            unlockClue(clue.id, clue.password);
          }}
        />
      ))}
    </div>
  );
}
