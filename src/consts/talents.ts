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
        description:
          "Provides a solid base, increasing overall stability and resilience.",
        spritePosition: 0,
      },
      {
        id: 2,
        name: "Health talent",
        type: TalentType.Health,
        description: "Boosts health regeneration and overall vitality.",
        spritePosition: 1,
      },
      {
        id: 3,
        name: "Celebration talent",
        type: TalentType.Celebration,
        description:
          "Enhances morale and team spirit, increasing productivity.",
        spritePosition: 2,
      },
      {
        id: 4,
        name: "Royalty talent",
        type: TalentType.Royalty,
        description:
          "Grants leadership qualities, improving command and influence.",
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
        description:
          "Improves navigation and speed, enhancing travel efficiency.",
        spritePosition: 4,
      },
      {
        id: 6,
        name: "Vision talent",
        type: TalentType.Vision,
        description: "Increases foresight and strategic planning abilities.",
        spritePosition: 5,
      },
      {
        id: 7,
        name: "Speed talent",
        type: TalentType.Speed,
        description: "Boosts agility and quickness, improving reaction times.",
        spritePosition: 6,
      },
      {
        id: 8,
        name: "Death talent",
        type: TalentType.Death,
        description:
          "Enhances resilience against fatal threats, increasing survivability.",
        spritePosition: 7,
      },
    ],
  },
];

export const totalPoints = 6;
