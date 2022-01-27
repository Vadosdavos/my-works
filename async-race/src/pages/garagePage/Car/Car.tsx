import styles from './Car.styles.css';
import { carImg } from './Car.svg';

export const Car = () => {
  return <div className={styles.car}>{carImg}</div>;
};
