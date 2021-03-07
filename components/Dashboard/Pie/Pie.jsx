import React from "react";
import { PieChart, Pie, Sector, Cell } from 'recharts';
import styles from "./Pie.module.scss";

const COLORS = ['#e04f42', '#eec612', '#29cd6e'];

const Graph = (props) => {
  const data = props.data;
  return (
    <div className={styles.main}>
      <PieChart width={180} height={120}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} fill="#82ca9d">
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </div>
  );
};

export default Graph;