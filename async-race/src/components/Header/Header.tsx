import { NavButton } from '../NavButton/NavButton';
import styles from './Header.styles.css';

export const Header = () => {
  return (
    <>
      <header className={styles.mainHeader}>
        <NavButton title='to garage' path='/' />
        <NavButton title='to winners' path='winners' />
      </header>
    </>
  );
};
