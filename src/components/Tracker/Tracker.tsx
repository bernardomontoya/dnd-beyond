import styles from "./Tracker.module.css";

type TrackerProps = {
  current: number;
  label: string;
  total: number;
};

export const Tracker = ({ current, label, total }: TrackerProps) => {
  return (
    <div className={styles.tracker}>
      <span className={styles.points}>{`${current} / ${total}`}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
