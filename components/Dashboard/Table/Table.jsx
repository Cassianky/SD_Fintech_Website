import React from "react";
import styles from "./Table.module.scss";

const Table = (props) => {
  const data = Array.from(props.data);
  return (
    <div className={styles.card}>
      <table>
        <thead>
          <tr>
            <th>{props.title}</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
