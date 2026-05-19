import styles from '../../styles/blocks/subNetLab.module.css'

export default function InputField({ label, value, onChange, placeholder, type = "text", min, max }) {
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        onFocus={e => e.target.style.borderColor = "#c8ff00"}
        onBlur={e => e.target.style.borderColor = "#2a2a3a"}
      />
    </div>
  );
}