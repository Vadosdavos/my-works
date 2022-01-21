import styles from './WinTable.styles.css';

export const WinTable = () => {
  return (
    <section style={styles}>
      <p>Page #1</p>
      <table>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time (sec)</th>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
      </table>
    </section>
  );
};
