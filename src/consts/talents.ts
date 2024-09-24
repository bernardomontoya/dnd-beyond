import type { Talent, TalentPath } from "@/types";

const foundationTalent: Talent = {
  id: 1,
  name: "Foundation talent",

  description:
    "Provides a solid base, increasing overall stability and resilience.",
  spritePosition: 0,
};

const healthTalent: Talent = {
  id: 2,
  name: "Health talent",
  description: "Boosts health regeneration and overall vitality.",
  spritePosition: 1,
};

const celebrationTalent: Talent = {
  id: 3,
  name: "Celebration talent",
  description: "Enhances morale and team spirit, increasing productivity.",
  spritePosition: 2,
};

const royaltyTalent: Talent = {
  id: 4,
  name: "Royalty talent",
  description: "Grants leadership qualities, improving command and influence.",
  spritePosition: 3,
};

const shipTalent: Talent = {
  id: 5,
  name: "Ship talent",
  description: "Improves navigation and speed, enhancing travel efficiency.",
  spritePosition: 4,
};

const visionTalent: Talent = {
  id: 6,
  name: "Vision talent",
  description: "Increases foresight and strategic planning abilities.",
  spritePosition: 5,
};

const speedTalent: Talent = {
  id: 7,
  name: "Speed talent",
  description: "Boosts agility and quickness, improving reaction times.",
  spritePosition: 6,
};

const deathTalent: Talent = {
  id: 8,
  name: "Death talent",
  description:
    "Enhances resilience against fatal threats, increasing survivability.",
  spritePosition: 7,
};

export const talentPaths: TalentPath[] = [
  {
    id: 1,
    name: "Talent Path 1",
    talents: [foundationTalent, healthTalent, celebrationTalent, royaltyTalent],
  },
  {
    id: 2,
    name: "Talent Path 2",
    talents: [shipTalent, visionTalent, speedTalent, deathTalent],
  },
];

export const totalPoints = 6;
