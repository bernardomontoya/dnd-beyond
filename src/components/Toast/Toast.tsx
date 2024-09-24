import { useEffect } from "react";

import styles from "./Toast.module.css";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast}>
      <span>{message}</span>
    </div>
  );
};
