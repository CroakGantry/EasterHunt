import userEvent from "@testing-library/user-event";
import { cleanup, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { clues } from "@/lib/clues";

describe("Easter Treasure Hunt page", () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("renders the heading, subheadings, and nine locked clue cards", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Easter Treasure Hunt" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Find nine passwords to unlock nine clues.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Find them all to be rewarded with a magnificent prize!"
      )
    ).toBeInTheDocument();

    const clueHeadings = screen.getAllByRole("heading", { name: /Clue \d/i });
    expect(clueHeadings).toHaveLength(9);

    for (const heading of clueHeadings) {
      const card = heading.closest("section");

      expect(card).not.toBeNull();

      const scopedQueries = within(card as HTMLElement);
      expect(
        scopedQueries.getByPlaceholderText("Enter password")
      ).toBeInTheDocument();
      expect(card?.querySelector("video")).toBeNull();
    }
  });

  it("restores unlocked cards from localStorage on first render", () => {
    localStorage.setItem(
      "easter-hunt-unlocked-cards-v3",
      JSON.stringify(["clue-1"])
    );

    render(<Home />);

    const clueOneHeading = screen.getByRole("heading", { name: "Clue 1" });
    const clueOneCard = clueOneHeading.closest("section");

    expect(clueOneCard).not.toBeNull();

    const scopedQueries = within(clueOneCard as HTMLElement);
    expect(
      scopedQueries.queryByPlaceholderText("Enter password")
    ).not.toBeInTheDocument();

    const videoElement = clueOneCard?.querySelector("video");
    expect(videoElement).not.toBeNull();
    expect(videoElement).toHaveAttribute("src", clues[0].videoSrc);
    expect(videoElement).toHaveAttribute("controls");
  });

  it("unlocks a card with the correct password and persists it", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const clueOneHeading = screen.getByRole("heading", { name: "Clue 1" });
    const clueOneCard = clueOneHeading.closest("section");

    expect(clueOneCard).not.toBeNull();

    const scopedQueries = within(clueOneCard as HTMLElement);

    await user.type(scopedQueries.getByPlaceholderText("Enter password"), clues[0].password);
    await user.click(
      scopedQueries.getByRole("button", { name: "Unlock Clue 1" })
    );

    expect(
      scopedQueries.queryByPlaceholderText("Enter password")
    ).not.toBeInTheDocument();
    expect(localStorage.getItem("easter-hunt-unlocked-cards-v3")).toBe(
      JSON.stringify(["clue-1"])
    );

    const videoElement = clueOneCard?.querySelector("video");
    expect(videoElement).not.toBeNull();
    expect(videoElement).toHaveAttribute("src", clues[0].videoSrc);
    expect(videoElement).toHaveAttribute("controls");
  });

  it("keeps a card locked when the password is wrong", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const clueTwoHeading = screen.getByRole("heading", { name: "Clue 2" });
    const clueTwoCard = clueTwoHeading.closest("section");

    expect(clueTwoCard).not.toBeNull();

    const scopedQueries = within(clueTwoCard as HTMLElement);

    await user.type(scopedQueries.getByPlaceholderText("Enter password"), "wrong");
    await user.click(
      scopedQueries.getByRole("button", { name: "Unlock Clue 2" })
    );

    expect(
      scopedQueries.getByPlaceholderText("Enter password")
    ).toBeInTheDocument();
    expect(
      scopedQueries.getByText("That password is not quite right yet.")
    ).toBeInTheDocument();
    expect(localStorage.getItem("easter-hunt-unlocked-cards-v3")).toBeNull();
  });
});
