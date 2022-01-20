import { FormField } from '../FormField/FormField';
import { Track } from '../Track/Track';
import styles from './Garage.styles.css';

export const Garage = () => {
  return (
    <>
      <section className={styles.controls}>
        <FormField type='create' />
        <FormField type='update' />
        <button className={styles.controlsBtn}>Race</button>
        <button className={styles.controlsBtn}>Reset</button>
        <button className={styles.controlsBtn}>Generate cars</button>
      </section>
      <h2>
        Garage <span>(0)</span>
      </h2>
      <Track />
      <div>
        <button>prev</button>
        <button>next</button>
      </div>
    </>
  );
};
