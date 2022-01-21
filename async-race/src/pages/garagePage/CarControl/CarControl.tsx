import styles from './CarControl.styles.css';
import { carImg } from './Car.svg';

export const CarControl = () => {
  return (
    <div className={styles.carContainer}>
      <div className={styles.controls}>
        <button className={styles.selectBtn}>Select</button>
        <button className={styles.removeBtn}>Remove</button>
        <div className={styles.name}>car name</div>
      </div>
      <div className={styles.road}>
        <button className={styles.startBtn}>A</button>
        <button className={`${styles.stopBtn} ${styles.inactiveBtn}`} disabled>
          B
        </button>
        <div className={styles.car}>{carImg}</div>
      </div>
    </div>
  );
};
