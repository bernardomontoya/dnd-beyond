import { Header } from "@/components/Header/Header";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <Header title="TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000" />
      </main>
    </div>
  );
}
