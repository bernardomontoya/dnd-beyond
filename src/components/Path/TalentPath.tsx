import { Rune } from "@/components/Rune/Rune";
import type { Talent, TalentPath } from "@/types/talents";
import styles from "./TalentPath.module.css";
import { Fragment } from "react";

type TalentPathProps = {
  talentPath: TalentPath;
  pointsSpent: Talent["id"][];
  onPointSpent: (args: { id: Talent["id"] }) => void;
};

export const Path = ({
  onPointSpent,
  pointsSpent,
  talentPath,
}: TalentPathProps) => {
  return (
    <div className={styles.talentPath}>
      <h3>{talentPath.name}</h3>
      <div className={styles.talents}>
        {talentPath.talents.map((talent, position) => {
          const isActive = pointsSpent.includes(talent.id);

          return (
            <Fragment key={talent.id}>
              <Rune
                isActive={isActive}
                talent={talent}
                onClick={() => onPointSpent({ id: talent.id })}
              />
              {position !== talentPath.talents.length - 1 && (
                <span
                  className={`${styles.connector} ${
                    isActive ? styles.connectorActive : ""
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
