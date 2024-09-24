import { type TalentPath, TalentType } from "@/types/talents";

export const talentPaths: TalentPath[] = [
  {
    id: 1,
    name: "Talent Path 1",
    talents: [
      {
        id: 1,
        name: "Foundation talent",
        type: TalentType.Foundation,
        description: "This is the first talent in the first path.",
        spritePosition: 0,
      },
      {
        id: 2,
        name: "Health talent",
        type: TalentType.Health,
        description: "This is the second talent in the first path.",
        spritePosition: 1,
      },
      {
        id: 3,
        name: "Celebration talent",
        type: TalentType.Celebration,
        description: "This is the third talent in the first path.",
        spritePosition: 2,
      },
      {
        id: 4,
        name: "Royalty talent",
        type: TalentType.Royalty,
        description: "This is the third talent in the first path.",
        spritePosition: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Talent Path 2",
    talents: [
      {
        id: 5,
        name: "Ship talent",
        type: TalentType.Ship,
        description: "This is the first talent in the second path.",
        spritePosition: 4,
      },
      {
        id: 6,
        name: "Vision talent",
        type: TalentType.Vision,
        description: "This is the second talent in the second path.",
        spritePosition: 5,
      },
      {
        id: 7,
        name: "Speed talent",
        type: TalentType.Speed,
        description: "This is the third talent in the second path.",
        spritePosition: 6,
      },
      {
        id: 8,
        name: "Death talent",
        type: TalentType.Death,
        description: "This is the third talent in the second path.",
        spritePosition: 7,
      },
    ],
  },
];

export const totalPoints = 6;
