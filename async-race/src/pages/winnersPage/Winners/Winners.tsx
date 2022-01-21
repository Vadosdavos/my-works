import { WinTable } from '../WinTable/WinTable';
import styles from './Winners.styles.css';

export const Winners = () => {
  return (
    <>
        <h2>
          Winners <span>(0)</span>
        </h2>
       <WinTable />
        <div>
          <button>prev</button>
          <button>next</button>
        </div>
    </>
  );
};
