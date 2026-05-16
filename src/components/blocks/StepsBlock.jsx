import styles from "../../styles/blocks/stepsBlock.module.css";

export default function StepsBlock({ item }) {
    return (
        <ol className={styles.list}>
            {item.items.map((i, idx) => (
                <li key={idx} className={styles.item}>
                    <span className={styles.number}>
                        {idx + 1}
                    </span>

                    <span className={styles.text}>
                        {i}
                    </span>
                </li>
            ))}
        </ol>
    );
}