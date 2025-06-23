import styles from "./Card.module.css";

export function Card({ name, img, type, height, weight, color = "white" }) {
  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      <h2>{name}</h2>
      <img src={img} alt="Pokemon"/>
      <p>Type: {type}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
    </div>
  );
}
