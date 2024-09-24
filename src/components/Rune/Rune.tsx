/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import type { Talent } from "@/types/talents";
import icons from "./assets/icons.png";
import styles from "./Rune.module.css";

type RuneProps = {
  isActive: boolean;
  talent: Talent;
  onClick: (args: { clickDirection: "right" | "left" }) => void;
};

const iconSize = 50;

export const Rune = ({ isActive, talent, onClick }: RuneProps) => {
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

  return (
    <button
      className={`${styles.rune} ${isActive ? styles.runeActive : ""}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
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
