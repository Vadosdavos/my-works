import styles from './NavButton.styles.css';
import { Link } from 'react-router-dom';

type NavButtonProps = {
  title: string;
  path: string;
};

export const NavButton = ({ title, path }: NavButtonProps): JSX.Element => {
  return (
    <Link className={styles.headerButton} to={path}>
      {title}
    </Link>
  );
};
