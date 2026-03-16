import { render, screen, within } from "@testing-library/react";
import { ClueCard } from "@/components/clue-card";
import { clues } from "@/lib/clues";

describe("ClueCard layout", () => {
  it("uses the same face frame for locked and unlocked cards", () => {
    const { rerender } = render(
      <ClueCard
        clue={clues[0]}
        inputValue=""
        isUnlocked={false}
        onInputChange={() => {}}
        onUnlock={() => {}}
      />
    );

    const lockedLayout = screen.getByTestId("locked-face-layout");
    expect(within(lockedLayout).getByTestId("card-header-row")).toBeInTheDocument();
    expect(within(lockedLayout).getByTestId("card-body")).toBeInTheDocument();

    rerender(
      <ClueCard
        clue={clues[0]}
        inputValue=""
        isUnlocked
        onInputChange={() => {}}
        onUnlock={() => {}}
      />
    );

    const unlockedLayout = screen.getByTestId("unlocked-face-layout");
    expect(
      within(unlockedLayout).getByTestId("card-header-row")
    ).toBeInTheDocument();
    expect(within(unlockedLayout).getByTestId("card-body")).toBeInTheDocument();
  });
});
