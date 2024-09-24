import { Rune } from "@/components/Rune/Rune";
import type { Talent, TalentPath } from "@/types/talents";
import styles from "./TalentPath.module.css";

type TalentPathProps = {
  talentPath: TalentPath;
  onPointSpent: (args: { id: Talent["id"] }) => void;
};

export const Path = ({ onPointSpent, talentPath }: TalentPathProps) => {
  return (
    <div className={styles.talentPath}>
      <h3>{talentPath.name}</h3>
      <div>
        {talentPath.talents.map((talent) => (
          <Rune
            key={talent.id}
            talent={talent}
            onClick={() => onPointSpent({ id: talent.id })}
          />
        ))}
      </div>
    </div>
  );
};
