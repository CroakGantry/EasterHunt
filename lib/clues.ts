export type ClueDefinition = {
  id: string;
  title: string;
  password: string;
  videoSrc: string;
};

export const clues: ClueDefinition[] = [
  {
    id: "clue-1",
    title: "Clue 1",
    password: "chocolate-bunny",
    videoSrc: "/videos/clue-1.mp4",
  },
  {
    id: "clue-2",
    title: "Clue 2",
    password: "pastel-eggs",
    videoSrc: "/videos/clue-2.mp4",
  },
  {
    id: "clue-3",
    title: "Clue 3",
    password: "carrot-cake",
    videoSrc: "/videos/clue-3.mp4",
  },
  {
    id: "clue-4",
    title: "Clue 4",
    password: "spring-meadow",
    videoSrc: "/videos/clue-4.mp4",
  },
  {
    id: "clue-5",
    title: "Clue 5",
    password: "lilac-dream",
    videoSrc: "/videos/clue-5.mp4",
  },
  {
    id: "clue-6",
    title: "Clue 6",
    password: "golden-egg",
    videoSrc: "/videos/clue-6.mp4",
  },
];
