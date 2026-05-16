import styles from "../../styles/blocks/textBlock.module.css";

export default function TextBlock({ item }) {
    return (
        <p className={styles.text}>
            {item.text}
        </p>
    );
}