import styles from "../../styles/blocks/listBlock.module.css";

export default function ListBlock({ item }) {
    return (
        <ul className={styles.list}>
            {item.items.map((i, idx) => (
                <li key={idx} className={styles.item}>
                    <span className={styles.marker}>›</span>

                    {i}
                </li>
            ))}
        </ul>
    );
}