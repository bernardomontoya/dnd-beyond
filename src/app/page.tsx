import { Header } from "@/components/Header/Header";

import { Path } from "@/components/Path/TalentPath";
import { talentPaths } from "@/consts/talents";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header title="TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000" />
        <div className={styles.talentPaths}>
          {talentPaths.map((path) => (
            <Path key={path.id} talentPath={path} />
          ))}
        </div>
      </main>
    </div>
  );
}
