import styles from "../../styles/blocks/callOutBlock.module.css";

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