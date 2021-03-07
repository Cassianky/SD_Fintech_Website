import React from "react";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart
} from 'recharts';
import styles from "./Bar.module.scss";

const Graph = (props) => {
  return (
    <div className={styles.main}>
      <span style={{"font-weight":"700"}}>
        {props.title}
      </span>
      <div className={styles.card}>
        <ResponsiveContainer>
          <ComposedChart
            data={props.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: 'Time', position: "insideBottom", dy: 10}}/>
            <YAxis yAxisId="left" label={{ value: 'No. of News', position: "insideLeft", angle: -90,   dy: 30 }}  />
            <YAxis yAxisId="right" orientation="right" domain={[-1,1]} label={{ value: 'Avg. Sentiment Score', angle: -90, position: 'insideRight',  dy: -70 }} />
            <Tooltip />
            <Legend wrapperStyle={{ top: 0, left: 25 }} />
            <Bar yAxisId="left" dataKey="positive" stackId="a" fill="#29cd6e" />
            <Bar yAxisId="left" dataKey="neutral" stackId="a" fill="#eec612" />
            <Bar yAxisId="left" dataKey="negative" stackId="a" fill="#e04f42" />
            <Line yAxisId="right" dataKey="score" stroke="#a9a9a9" />
            </ComposedChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
