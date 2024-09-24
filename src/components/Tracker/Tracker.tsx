import clsx from "clsx";

import styles from "./Tracker.module.css";

type TrackerProps = {
  current: number;
  label: string;
  total: number;
};

export const Tracker = ({ current, label, total }: TrackerProps) => {
  const isTrackerComplete = current === total;

  return (
    <div className={styles.tracker} role="status" aria-live="polite">
      <span className={styles.points}>{`${current} / ${total}`}</span>
      <span
        className={clsx(styles.label, {
          [styles.labelComplete]: isTrackerComplete,
        })}
      >
        {label}
      </span>
    </div>
  );
};
