import React, { useState } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart
} from 'recharts';
import styles from "./Bar.module.scss";
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 

const Dropdown = (props) => {
    return (
        <BootstrapDropdown>
            <BootstrapDropdown.Toggle variant='success' id='dropdown'>
                <span>Company</span>
            </BootstrapDropdown.Toggle>

            <BootstrapDropdown.Menu>
                {props.items.map((name, index) => (
                    <BootstrapDropdown.Item
                        key={index}
                        onClick={(event) => {
                            console.log(event.target.text);
                            props.setSelected(event.target.text);
                        }}
                        value={name}
                    >
                        {name}
                    </BootstrapDropdown.Item>
                ))}
            </BootstrapDropdown.Menu>
        </BootstrapDropdown>
    );
};
  

const Graph = (items) => {
  return (
    <div className={styles.main}>
      <span style={{"font-weight":"700"}}>
        Sentinment Scores
      </span>
      <div className={styles.card}>
        <ResponsiveContainer>
          <ComposedChart
            data={items.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: 'Time', position: 'insideBottom' }}/>
            <YAxis yAxisId="left" label={{ value: 'No. of News', angle: -90, position: 'left' }} style={{ textAnchor: 'middle' }}/>
            <YAxis yAxisId="right" orientation="right" domain={[-1,1]} label={{ value: 'Avg. Sentiment Score', angle: -90, position: 'right'}} />
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

function App() {
    const [typeFilter, setTypeFilter] = useState('Netflix');

    var d1 = new Date();
    d1.setDate(d1.getDate()-365);
    
    const [startDate, setStartDate] = useState(d1);
    const [endDate, setEndDate] = useState(new Date());

    const allItems = [
        // name, type initially => original sample data 
        {
            date: '10/08/20', type: "Netflix", positive: 22, negative: 135, neutral: 154, score: 0.21,
          },
          {
            date: '17/08/20', type: "Netflix", positive: 112, negative: 513, neutral: 63, score: -0.59,
          },
          {
            date: '24/08/20', type: "Netflix", positive: 74, negative: 124, neutral: 12, score: 0.81,
          },
          {
            date: '31/08/20', type: "Netflix", positive: 43, negative: 13, neutral: 83, score: -0.77,
          },
          {
            date: '7/08/20', type: "Netflix", positive: 22, negative: 11, neutral: 80, score: -0.01,
          },
          {
            date: '31/08/20', type: "Google", positive: 43, negative: 13, neutral: 83, score: -0.77,
          },
          {
            date: '7/08/20', type: "Google", positive: 61, negative: 6, neutral: 80, score: 0.45,
          },
          {
            date: '14/08/20', type: "Google", positive: 10, negative: 56, neutral: 70, score: -0.34,
          },
          {
            date: '10/08/20', type: "Apple", positive: 150, negative: 10, neutral: 154, score: 0.39,
          },
          {
            date: '17/08/20', type: "Apple", positive: 112, negative: 513, neutral: 63, score: -0.59,
          }, 
          {
            date: '24/08/20', type: "Apple", positive: 74, negative: 124, neutral: 12, score: 0.81,
          }, 
          {
            date: '31/08/20', type: "Apple", positive: 143, negative: 13, neutral: 83, score: 0.57,
          }
    ];

    // console.log(allItems)

    // selected={startDate} 
    // onChange={date => setStartDate(date)} 

    // console.log(startDate)
    // console.log(endDate)
    // console.log(allItems[0].date >= startDate)

    const itemsToShow = allItems
        .filter((item) => {
            if (typeFilter) {
                return (item.type === typeFilter && item.date.split(/[/-]/).reverse().join("") >= moment(startDate).format("DD/MM/YY").split(/[/-]/).reverse().join(""))
                && (item.date.split(/[/-]/).reverse().join("") <= moment(endDate).format("DD/MM/YY").split(/[/-]/).reverse().join(""))
                ;
            }

        }); 

    // console.log("Test")
    // console.log(moment(startDate).format("DD/MM/YY")); // works to show results, filter works 
    // console.log(typeof(itemsToShow))
    // itemsToShow.data = undefined

    return (
        <div>
            <Graph data={itemsToShow}/>
        </div>
    );
}

// export default Graph;
export default App; 
