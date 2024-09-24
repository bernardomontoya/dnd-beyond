export type Talent = {
  id: number;
  description: string;
  name: string;
  spritePosition: number;
};

export type TalentPath = {
  id: number;
  name: string;
  talents: Talent[];
};
