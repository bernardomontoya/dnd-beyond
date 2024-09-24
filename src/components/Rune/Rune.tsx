import type { Talent } from "@/types/talents";
import styles from "./Rune.module.css";

type RuneProps = {
  talent: Talent;
  onClick: () => void;
};

export const Rune = ({ talent, onClick }: RuneProps) => {
  return (
    <div className={styles.rune} onClick={onClick}>
      <h1>{talent.name}</h1>
    </div>
  );
};
