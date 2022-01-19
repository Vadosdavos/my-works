import styles from './FormField.styles.css';

type FormProps = {
  type: string;
};

export const FormField = ({ type }: FormProps) => {
  return (
    <>
      <div className={styles.formField}>
        <input type='text' className={styles.textInput + ' ' + styles[type]} />
        <input type='color' className='colorInput' />
        <button className={styles.subButton}>{type}</button>
      </div>
    </>
  );
};
