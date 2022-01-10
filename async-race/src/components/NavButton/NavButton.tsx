import styles from './NavButton.styles.css';

type NavButtonProps = {
  title: string;
};

export const NavButton = ({ title }: NavButtonProps): JSX.Element => {
  const handleClick = (e: React.SyntheticEvent): void => {
    console.log(e.currentTarget.textContent);
  };

  return (
    <button className={styles.headerButton} onClick={handleClick}>
      {title}
    </button>
  );
};
