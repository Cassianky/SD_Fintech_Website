import React from "react";
import styles from "./Number.module.scss";

const Number = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_heading}>
        {props.name}
      </div>
      <div className={styles.color_box} style={{"background-color":props.color}}/>
      <div className={styles.card_value}>
        {props.value}
      </div>
    </div>
  );
};

export default Number;
