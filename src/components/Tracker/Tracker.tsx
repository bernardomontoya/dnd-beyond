import styles from "./Tracker.module.css";

type TrackerProps = {
  current: number;
  label: string;
  total: number;
  error: string;
};

export const Tracker = ({ current, label, total, error }: TrackerProps) => {
  return (
    <div className={styles.tracker}>
      <span className={styles.points}>{`${current} / ${total}`}</span>
      <span className={styles.label}>{label}</span>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
