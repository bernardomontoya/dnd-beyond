import styles from "./Tracker.module.css";

type TrackerProps = {
  current: number;
  label: string;
  total: number;
  error: string;
};

export const Tracker = ({ current, label, total, error }: TrackerProps) => {
  const isTrackerComplete = current === total;

  return (
    <div className={styles.tracker}>
      <span className={styles.points}>{`${current} / ${total}`}</span>
      <span
        className={`${styles.label} ${
          isTrackerComplete ? styles.labelComplete : ""
        }`}
      >
        {label}
      </span>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
