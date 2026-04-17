import styles from "./Card.module.css";

export default function Card({ children, className = "" }) {
  return <article className={`${styles.card} ${className}`}>{children}</article>;
}
