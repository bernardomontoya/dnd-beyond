/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import type { Talent } from "@/types/talents";
import icons from "./assets/icons.png";
import styles from "./Rune.module.css";

type RuneProps = {
  isActive: boolean;
  talent: Talent;
  onClick: () => void;
};

const iconSize = 50;

export const Rune = ({ isActive, talent, onClick }: RuneProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = talent.spritePosition ? talent.spritePosition * iconSize : 0;
  const y = isActive || isHovered ? 0 : iconSize;

  return (
    <button
      className={`${styles.rune} ${isActive ? styles.runeActive : ""}`}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <img
        onClick={onClick}
        alt={talent.name}
        src={icons.src}
        style={{ objectPosition: `-${x}px -${y}px` }}
      />
    </button>
  );
};
