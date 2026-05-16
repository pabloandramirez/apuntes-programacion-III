import styles from "../../styles/blocks/exerciseBlock.module.css";

export default function ExerciseBlock({ item, index }) {
  return (
    <div className={styles.exercise}>

      <div className={styles.header}>
        <span className={styles.badge}>
          Ejercicio {index}
        </span>

        <div className={styles.title}>
          {item.question}
        </div>
      </div>

      {item.items && (
        <ul className={styles.list}>
          {item.items.map((i, idx) => (
            <li key={idx} className={styles.item}>
              {i}
            </li>
          ))}
        </ul>
      )}

      {item.answer && (
        <div className={styles.answer}>
          Respuesta: {item.answer}
        </div>
      )}

    </div>
  );
}