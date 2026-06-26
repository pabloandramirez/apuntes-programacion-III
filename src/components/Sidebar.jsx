import { useState } from "react";
import styles from "../styles/sidebar.module.css";

export default function Sidebar({ sections, active, setActive }) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <button
                className={styles.mobileToggle}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰ Temas
            </button>

            <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""
                }`}>
                {/* Botón mobile */}

                <div className={styles.header}>
                    <div className={styles.label}>Apuntes</div>

                    <div className={styles.title}>
                        Apuntes
                        <br />
                        Primer Parcial
                    </div>
                </div>

                {sections.map((s, i) => {
                    const prevGroup = i > 0 ? sections[i - 1].group : null;
                    const showHeader = s.group && s.group !== prevGroup;
                    const isFirstGroup = showHeader && !sections.slice(0, i).some(prev => prev.group === s.group || prev.group);
                    return (
                        <div key={s.id}>
                            {showHeader && (
                                <div className={{ ...styles.groupHeader, ...(isFirstGroup ? { borderTop: '0', marginTop: '0' } : {}) }}>
                                {s.group}
                                </div>
                            )}
                            <button
                                key={s.id}
                                onClick={() => {
                                    setActive(s.id);
                                    setMenuOpen(false);
                                }}
                                className={`${styles.button} ${active === s.id ? styles.buttonActive : ""
                                    }`}
                                style={{
                                    borderLeftColor: active === s.id ? s.color : "transparent",
                                }}
                            >
                                <span
                                    className={styles.number}
                                    style={{
                                        color: active === s.id ? s.color : "#444",
                                    }}
                                >
                                    {s.number}
                                </span>

                                <span
                                    className={`${styles.buttonTitle} ${active === s.id ? styles.buttonTitleActive : ""
                                        }`}
                                >
                                    {s.title}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}