import styles from '../../styles/blocks/subNetLab.module.css'

export default function StepBox({ title, children }) {
  return (
    <div className={styles.stepBox}>
      <div className={styles.stepTitle}>{title}</div>
      {children}
    </div>
  );
}