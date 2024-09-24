import styles from "./Header.module.css";

export type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};
