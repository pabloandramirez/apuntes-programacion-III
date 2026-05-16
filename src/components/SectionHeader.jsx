import styles from "../styles/sectionHeader.module.css";

export default function SectionHeader({ current, length }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.number}
        style={{ color: current?.color }}
      >
        {current?.number} / {String(length).padStart(2, "0")}
      </div>

      <h1 className={styles.title}>
        {current?.title}
      </h1>

      <div
        className={styles.line}
        style={{ background: current?.color }}
      />
    </div>
  );
}