"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { Path } from "@/components/Path/TalentPath";
import { Tracker } from "@/components/Tracker/Tracker";
import { talentPaths, totalPoints } from "@/consts/talents";
import type { Talent } from "@/types/talents";
import styles from "./page.module.css";
import { Toast } from "@/components/Toast/Toast";

export default function Home() {
  const router = useRouter();
  const [pointsSpent, setPointsSpent] = useState<Talent["id"][]>([]);
  const [error, setError] = useState<string>("");
  const currentPoints = pointsSpent.length;

  // Parse the URL to extract the talents from query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const talents = searchParams.get("talents");
    if (talents) {
      const talentsArray = talents.split(",").map(Number);
      setPointsSpent(talentsArray);
    }
  }, []);

  // Update the URL whenever the pointsSpent state changes
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (pointsSpent.length > 0) {
      searchParams.set("talents", pointsSpent.join(","));
    } else {
      searchParams.delete("talents");
    }
    const newUrl = `?${searchParams.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [pointsSpent, router]);

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header title="TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000" />
        <div className={styles.content}>
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
            current={currentPoints}
            total={totalPoints}
            label="Points Spent"
          />
        </div>
        {error && <Toast message={error} onClose={() => setError("")} />}
      </main>
    </div>
  );
}
