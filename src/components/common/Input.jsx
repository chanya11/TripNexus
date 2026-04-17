import styles from "./Input.module.css";

export default function Input({ label, className = "", ...props }) {
  return (
    <label className={`${styles.label} ${className}`}>
      {label && <span>{label}</span>}
      <input className={styles.input} {...props} />
    </label>
  );
}
