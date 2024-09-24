"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/Header/Header";
import { Path } from "@/components/Path/TalentPath";
import { Tracker } from "@/components/Tracker/Tracker";
import { talentPaths, totalPoints } from "@/consts/talents";
import type { Talent } from "@/types/talents";
import styles from "./page.module.css";

export default function Home() {
  const [pointsSpent, setPointsSpent] = useState<Talent["id"][]>([]);
  const [error, setError] = useState<string>("");
  const currentPoints = pointsSpent.length;

  const handlePointSpent = ({
    talentId,
    isAdding,
  }: {
    talentId: Talent["id"];
    isAdding: boolean;
  }) => {
    // Check conditions for error states early to return immediately if needed
    if (isAdding && pointsSpent.includes(talentId)) {
      setError("You already spent a point here.");
      return;
    }

    if (isAdding && currentPoints === totalPoints) {
      setError("You have already spent all your points.");
      return;
    }

    // Check if the talent is being added in order
    const talentPath = talentPaths.find((path) =>
      path.talents.some((talent) => talent.id === talentId)
    );

    if (!talentPath) return;

    const talentIndex = talentPath.talents.findIndex(
      (talent) => talent.id === talentId
    );
    const previousTalent = talentPath.talents[talentIndex - 1];
    const isPreviousTalentSpent = previousTalent
      ? pointsSpent.includes(previousTalent.id)
      : true;

    if (talentIndex !== 0 && !isPreviousTalentSpent) {
      setError("You must spend points in order.");
      return;
    }

    // Unspend next talents in the path if needed
    const nextTalents = talentPath.talents.slice(talentIndex);
    const hasSpentNextTalents = nextTalents.some((talent) =>
      pointsSpent.includes(talent.id)
    );

    if (hasSpentNextTalents) {
      setPointsSpent(
        pointsSpent.filter(
          (spentId) => !nextTalents.some((talent) => talent.id === spentId)
        )
      );
      return;
    }

    // Adjust points spent based on adding or removing
    setPointsSpent(
      isAdding
        ? [...pointsSpent, talentId]
        : pointsSpent.filter((spentId) => spentId !== talentId)
    );

    setError("");
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header title="TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000" />
        <div className={styles.talentPaths}>
          {talentPaths.map((path) => (
            <Path
              key={path.id}
              talentPath={path}
              pointsSpent={pointsSpent}
              onPointSpent={handlePointSpent}
            />
          ))}
        </div>
        <Tracker
          error={error}
          current={currentPoints}
          total={totalPoints}
          label="Points Spent"
        />
      </main>
    </div>
  );
}
