/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import type { Talent } from "@/types";
import icons from "./assets/icons.png";
import styles from "./Rune.module.css";

type RuneProps = {
  isActive: boolean;
  isHighlighted: boolean;
  isLocked: boolean;
  talent: Talent;
  onClick: (args: { clickDirection: "right" | "left" }) => void;
};

const iconSize = 50;

export const Rune = ({
  isActive,
  isHighlighted,
  isLocked,
  talent,
  onClick,
}: RuneProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = talent.spritePosition ? talent.spritePosition * iconSize : 0;
  const y = isActive || isHovered ? 0 : iconSize;

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick({ clickDirection: "right" });
  };

  const handleLeftClick = () => {
    onClick({ clickDirection: "left" });
  };

  const handleTouchStart = () => {
    if (isActive) {
      onClick({ clickDirection: "right" });
    } else {
      onClick({ clickDirection: "left" });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      className={`${styles.rune} ${isActive ? styles.runeActive : ""} ${
        isLocked ? styles.runeLocked : ""
      } ${isHighlighted ? styles.runeHighlighted : ""}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      title={talent.description}
    >
      <img
        alt={talent.name}
        src={icons.src}
        style={{ objectPosition: `-${x}px -${y}px` }}
        draggable={false}
      />
    </button>
  );
};
