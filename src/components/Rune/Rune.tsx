import type { Talent } from "@/types/talents";
import styles from "./Rune.module.css";

type RuneProps = {
  talent: Talent;
};

export const Rune = ({ talent }: RuneProps) => {
  return (
    <div className={styles.rune}>
      <h1>{talent.name}</h1>
    </div>
  );
};
