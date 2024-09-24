export enum TalentType {
  Celebration = "Celebration",
  Death = "Death",
  Foundation = "Foundation",
  Health = "Health",
  Royalty = "Royalty",
  Ship = "Ship",
  Speed = "Speed",
  Vision = "Vision",
}

export type Talent = {
  id: number;
  description: string;
  name: string;
  type: TalentType;
};

export type TalentPath = {
  id: number;
  name: string;
  talents: Talent[];
};
