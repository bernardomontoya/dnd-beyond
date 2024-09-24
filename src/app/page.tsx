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

  const handlePointSpent = ({ id }: { id: Talent["id"] }) => {
    // Check if the user has already spent all their points
    const isAlreadySpent = pointsSpent.includes(id);

    if (currentPoints === totalPoints && !isAlreadySpent) {
      setError("You have already spent all your points.");
      return;
    }

    // Check if the previous talent in the path has been spent
    const talentPath = talentPaths.find((path) =>
      path.talents.some((talent) => talent.id === id)
    );

    const talentPositionInPath = talentPath?.talents.findIndex(
      (talent) => talent.id === id
    );

    const previousTalent =
      talentPositionInPath !== undefined
        ? talentPath?.talents[talentPositionInPath - 1]
        : undefined;

    const isPreviousTalentSpent = previousTalent
      ? pointsSpent.includes(previousTalent.id)
      : false;

    if (talentPositionInPath !== 0 && !isPreviousTalentSpent) {
      setError("You must spend points in order.");
      return;
    }

    // Unspent next talents in the path if they are spent
    const nextTalentsInPath = talentPath?.talents.slice(talentPositionInPath);
    const nextTalentsAreSpent = nextTalentsInPath?.some((talent) =>
      pointsSpent.includes(talent.id)
    );

    if (nextTalentsAreSpent) {
      const newTalentIds = pointsSpent.filter(
        (talentId) =>
          !nextTalentsInPath?.some((talent) => talent.id === talentId)
      );

      setPointsSpent(newTalentIds);
      return;
    }

    // Unspent the point
    if (isAlreadySpent) {
      setPointsSpent(pointsSpent.filter((talentId) => talentId !== id));
      return;
    }

    // Spend the point
    setPointsSpent([...pointsSpent, id]);

    // Clear the error message
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
