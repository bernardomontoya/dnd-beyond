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
    const isAlreadySpent = pointsSpent.includes(id);

    if (currentPoints === totalPoints && !isAlreadySpent) {
      setError("You have already spent all your points.");
      return;
    }

    if (isAlreadySpent) {
      setPointsSpent(pointsSpent.filter((talentId) => talentId !== id));
    } else {
      setPointsSpent([...pointsSpent, id]);
    }
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
