import styles from './Header.styles.css';

export const Header = () => {
  const handleClick = (e: React.SyntheticEvent) => {
    console.log(e.currentTarget);
  };

  return (
    <>
      <header className={styles.mainHeader}>
        <button className={styles.headerButton} onClick={handleClick}>
          to garage
        </button>
        <button className={styles.headerButton} onClick={handleClick}>
          to winners
        </button>
      </header>
    </>
  );
};
