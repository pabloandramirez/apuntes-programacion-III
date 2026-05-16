import styles from "../../styles/blocks/definitionBlock.module.css";

export default function DefinitionBlock({ item }) {
    return (
        <div className={styles.definition}>
            <div className={styles.label}>
                Definición
            </div>

            <span className={styles.term}>
                {item.term}:
            </span>

            <span className={styles.text}>
                {" "}
                {item.text}
            </span>
        </div>
    );
}