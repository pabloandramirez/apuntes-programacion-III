import styles from "../../styles/blocks/subtitleBlock.module.css";

export default function SubtitleBlock({ item }) {
    return (
        <h3 className={styles.subtitle}>
            {item.text}
        </h3>
    );
}