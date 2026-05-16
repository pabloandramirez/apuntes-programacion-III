import styles from "../../styles/blocks/tableBlock.module.css";

export default function TableBlock({ item }) {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {item.headers.map((h, i) => (
                            <th key={i} className={styles.header}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {item.rows.map((row, ri) => (
                        <tr
                            key={ri}
                            className={
                                ri % 2 === 0
                                    ? styles.row
                                    : `${styles.row} ${styles.rowAlt}`
                            }
                        >
                            {row.map((cell, ci) => (
                                <td
                                    key={ci}
                                    className={
                                        ci === 0
                                            ? `${styles.cell} ${styles.firstCell}`
                                            : styles.cell
                                    }
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}