import styles from '../../styles/blocks/subNetLab.module.css'

export default function StatBox({ label, value, small }) {
  return (
    <div className={styles.card} style={{ padding: "14px 18px", marginBottom: 0 }}>
      <div className={styles.statLabel}>{label}</div>
      <div className={small ? styles.statValueSm : styles.statValue}>{value}</div>
    </div>
  );
}