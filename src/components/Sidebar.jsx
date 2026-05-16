import styles from "../styles/sidebar.module.css";

export default function Sidebar({ sections, active, setActive }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.label}>Apuntes</div>

        <div className={styles.title}>
          Redes de
          <br />
          Computadoras
        </div>
      </div>

      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => setActive(s.id)}
          className={`${styles.button} ${
            active === s.id ? styles.buttonActive : ""
          }`}
          style={{
            borderLeftColor: active === s.id ? s.color : "transparent",
          }}
        >
          <span
            className={styles.number}
            style={{
              color: active === s.id ? s.color : "#444",
            }}
          >
            {s.number}
          </span>

          <span
            className={`${styles.buttonTitle} ${
              active === s.id ? styles.buttonTitleActive : ""
            }`}
          >
            {s.title}
          </span>
        </button>
      ))}
    </div>
  );
}