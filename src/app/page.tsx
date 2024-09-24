"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Header, Path, Toast, Tracker } from "@/components";
import { talentPaths, totalPoints } from "@/consts";
import { CalculatorErrors } from "@/enums";
import type { Talent } from "@/types";
import styles from "./page.module.css";

export default function Home() {
  // Hooks
  const router = useRouter();
  const [pointsSpent, setPointsSpent] = useState<Talent["id"][]>([]);
  const [error, setError] = useState<string>("");

  // Consts
  const currentPoints = pointsSpent.length;

  // Callbacks
  const handlePointSpent = useCallback(
    ({ talentId, isAdding }: { talentId: Talent["id"]; isAdding: boolean }) => {
      if (isAdding && pointsSpent.includes(talentId)) {
        setError(CalculatorErrors.AlreadySpent);
        return;
      }

      if (isAdding && currentPoints === totalPoints) {
        setError(CalculatorErrors.AllPointsSpent);
        return;
      }

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
        setError(CalculatorErrors.OrderRequired);
        return;
      }

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

      setPointsSpent(
        isAdding
          ? [...pointsSpent, talentId]
          : pointsSpent.filter((spentId) => spentId !== talentId)
      );

      setError("");
    },
    [pointsSpent, currentPoints]
  );

  // Components
  const talentPathElements = useMemo(
    () =>
      talentPaths.map((path) => (
        <Path
          key={path.id}
          talentPath={path}
          pointsSpent={pointsSpent}
          onPointSpent={handlePointSpent}
        />
      )),
    [pointsSpent, handlePointSpent]
  );

  // Side effects
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const talents = searchParams.get("talents");
    if (talents) {
      const talentsArray = talents.split(",").map(Number);
      setPointsSpent(talentsArray);
    }
  }, []);

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header title="TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000" />
        <div className={styles.content}>
          <div className={styles.talentPaths}>{talentPathElements}</div>
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
