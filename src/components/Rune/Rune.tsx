/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import clsx from "clsx";
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

  const handleClick = (direction: "right" | "left") => {
    onClick({ clickDirection: direction });
  };

  const handleToggle = () => {
    handleClick(isActive ? "right" : "left");
  };

  const getAriaLabel = () => {
    if (isLocked) return `${talent.name} is locked`;
    return isActive ? `Remove ${talent.name}` : `Add ${talent.name}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  return (
    <button
      className={clsx(styles.rune, {
        [styles.runeActive]: isActive,
        [styles.runeLocked]: isLocked,
        [styles.runeHighlighted]: isHighlighted,
      })}
      onClick={() => handleClick("left")}
      onContextMenu={(e) => {
        e.preventDefault();
        handleClick("right");
      }}
      onTouchStart={handleToggle}
      onTouchEnd={(e) => e.preventDefault()}
      onMouseOver={() => handleHover(true)}
      onMouseOut={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      title={talent.description}
      aria-label={getAriaLabel()}
      onKeyDown={handleKeyDown}
      onKeyUp={(e) => e.key === "Enter" && e.preventDefault()}
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
