import { FormField } from '../FormField/FormField';
import styles from './Garage.styles.css';

export const Garage = () => {
  return (
    <>
      <form className={styles.controls}>
        <FormField type='create' />
        <FormField type='update' />
      </form>
      <h2>Garage</h2>
    </>
  );
};
