import styles from './Car.styles.css';
import { carImg } from './Car.svg';

export const Car = () => {
  return (
    <div className={styles.carContainer}>
      <button className={styles.selectBtn}>Select</button>
      <button className={styles.removeBtn}>Remove</button>
      <div className={styles.name}>car name</div>
      <button className={styles.startBtn}>A</button>
      <button className={`${styles.stopBtn} ${styles.inactiveBtn}`} disabled>
        B
      </button>
      <div className={styles.car}>{carImg}</div>
      <div className={styles.road}></div>
    </div>
  );
};
