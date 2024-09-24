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

  const handleToggle = () => {
    onClick({ clickDirection: isActive ? "right" : "left" });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <button
      className={`${styles.rune} ${isActive ? styles.runeActive : ""} ${
        isLocked ? styles.runeLocked : ""
      } ${isHighlighted ? styles.runeHighlighted : ""}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      onTouchStart={handleToggle}
      onTouchEnd={handleTouchEnd}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      title={talent.description}
      aria-label={`Add ${talent.name}`}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <img
        alt=""
        src={icons.src}
        style={{ objectPosition: `-${x}px -${y}px` }}
        draggable={false}
      />
    </button>
  );
};
