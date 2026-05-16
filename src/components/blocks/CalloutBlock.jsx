import styles from "../../styles/blocks/calloutBlock.module.css";

export default function CalloutBlock({ item }) {
    return (
        <div className={styles.callout}>
            <span className={styles.icon}>⚠</span>

            <span className={styles.text}>
                {item.text}
            </span>
        </div>
    );
}