import { Rune } from "@/components/Rune/Rune";
import type { TalentPath } from "@/types/talents";
import styles from "./TalentPath.module.css";

type TalentPathProps = {
  talentPath: TalentPath;
};

export const Path = ({ talentPath }: TalentPathProps) => {
  return (
    <div className={styles.talentPath}>
      <h3>{talentPath.name}</h3>
      <ul>
        {talentPath.talents.map((talent) => (
          <li key={talent.id}>
            <Rune talent={talent} />
          </li>
        ))}
      </ul>
    </div>
  );
};
