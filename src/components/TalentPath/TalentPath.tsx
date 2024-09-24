import clsx from "clsx";
import { Fragment, useMemo } from "react";

import { Rune } from "@/components/Rune/Rune";
import type { Talent, TalentPath as TalentPathType } from "@/types";
import styles from "./TalentPath.module.css";

type TalentPathProps = {
  talentPath: TalentPathType;
  pointsSpent: Talent["id"][];
  onPointSpent: (args: { talentId: Talent["id"]; isAdding: boolean }) => void;
};

export const TalentPath = ({
  talentPath,
  pointsSpent,
  onPointSpent,
}: TalentPathProps) => {
  const talents = useMemo(() => talentPath.talents, [talentPath]);

  const isTalentActive = (id: Talent["id"]) => pointsSpent.includes(id);
  const isTalentUnlocked = (position: number) =>
    position === 0 || pointsSpent.includes(talentPath.talents[position - 1].id);

  return (
    <div className={styles.talentPath}>
      <h3>{talentPath.name}</h3>
      <div className={styles.talents}>
        {talents.map((talent, position) => {
          const isActive = isTalentActive(talent.id);
          const isUnlocked = isTalentUnlocked(position);
          const isLastTalentActive =
            position === talents.length - 1 && isActive;

          return (
            <Fragment key={talent.id}>
              <Rune
                isActive={isActive}
                isHighlighted={isLastTalentActive}
                isLocked={!isUnlocked}
                talent={talent}
                onClick={({ clickDirection }) =>
                  onPointSpent({
                    talentId: talent.id,
                    isAdding: clickDirection === "left",
                  })
                }
              />
              {position !== talents.length - 1 && (
                <span
                  className={clsx(styles.connector, {
                    [styles.connectorActive]: isActive,
                  })}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
