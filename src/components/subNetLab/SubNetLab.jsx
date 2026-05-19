import { useState } from "react";
import styles from '../../styles/blocks/subNetLab.module.css'
import TabCalculadora from "./Calculator";
import TabDivisor from "./Divisor";
import { TabMultinivel } from "./TabMultinivel";
import { TabVerificador } from "./TabVerificador";
import creditImg from '/capybara-gracias.png';
// ─── APP ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "calc", label: "Calculadora" },
  { id: "div", label: "Divisor" },
  { id: "multi", label: "Multinivel" },
  { id: "check", label: "Verificador" },
];

export default function SubNetLab() {
  const [tab, setTab] = useState("calc");

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>SubnetLab</h1>
        <span className={styles.subtitle}>
          Calculadora de subredes IPv4
        </span>
      </div>

      <div className={styles.creditBox}>
        <img
          src={creditImg}
          alt="Agradecimiento"
          className={styles.creditImg}
        />

        <span className={styles.creditText}>
          Gracias Erick!
        </span>
      </div>

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ""
              }`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tab === "calc" && <TabCalculadora />}
        {tab === "div" && <TabDivisor />}
        {tab === "multi" && <TabMultinivel />}
        {tab === "check" && <TabVerificador />}
      </div>
    </div>
  );
}