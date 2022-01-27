import { Car } from "../Car/Car"
import styles from './Track.styles.css';

export const Track = () => {
  return <>
    <section>
      <p>Page #1</p>
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
        <Car></Car>
      </div>
    </div>
    </section>
    </>
}