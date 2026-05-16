import styles from '../styles/navigation.module.css'

export default function Navigation({sections,active,setActive}) {
    return (
        <>
            <div className={styles.navigation}>
                {sections.findIndex(s => s.id === active) > 0 ? (
                    <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) - 1].id)} className={styles.btn}>
                        ← Anterior
                    </button>
                ) : <div />}
                {sections.findIndex(s => s.id === active) < sections.length - 1 ? (
                    <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) + 1].id)} className={styles.btn}>
                        Siguiente →
                    </button>
                ) : <div />}
            </div>
        </>
    )
}