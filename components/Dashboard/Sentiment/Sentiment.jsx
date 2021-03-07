import React from "react";
import styles from "./Sentiment.module.scss";

const Number = (props) => {
  let imagePath = "";
  if (props.value > 0.2)
    imagePath = "/positive.png";
  else if (props.value < -0.2)
    imagePath = "/negative.png";
  else
    imagePath = "/neutral.png";
  return (
    <div className={styles.card}>
      <div className={styles.card_heading}>
        {props.name}
      </div>
      <div className={styles.card_value}>
        <img src={imagePath} alt="emoticon" height="40px" width="40px" /> <br/>
        {props.value}
      </div>
    </div>
  );
};

export default Number;
