import React from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from 'styles/pages/Dashboard.module.scss';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart
} from 'recharts';
import DefaultLayout from "components/Layouts/DefaultLayout/DefaultLayout";
import Number from "components/Dashboard/Number/Number";
import Sentiment from "components/Dashboard/Sentiment/Sentiment";
import Pie from "components/Dashboard/Pie/Pie";
// import Bar from "components/Dashboard/Bar/Bar";
import Table from "components/Dashboard/Table/Table";
// import Filter from "components/Dashboard/Filter/Filter";
import App from "components/Dashboard/Date/Date";
import 'moment/locale/it';
import { useState, useEffect } from 'react';
import Link from "next/link";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

const data3 = [
  { name: 'Negative', value: 2400, color: '#e04f42'},
  { name: 'Neutral', value: 4567, color: '#eec612'},
  { name: 'Positive', value: 1398, color: '#29cd6e'}
];

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
                          // console.log(event.target.text);
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


const MachineLearningDashboard = (props) => {
  const [positiveScore, setPositiveScore] = useState(0); //positiveScore is the variable, setPositiveScore is the function to update the variable
  const [neutralScore, setNeutralScore] = useState(0); //positiveScore is the variable, setPositiveScore is the function to update the variable
  const [negativeScore, setNegativeScore] = useState(0); //positiveScore is the variable, setPositiveScore is the function to update the variable
  const [averageSentiment, setAverageSentiment] = useState(0); //positiveScore is the variable, setPositiveScore is the function to update the variable
  const [positiveNews, setPositiveNews] = useState([]);
  const [negativeNews, setNegativeNews] = useState([]);
  const [headlinesScores, setHeadlinesScores] = useState([]);
  const [companies, setCompanies] = useState([])


  //the 0 inside useState specifies the initial value of the component
  const [typeFilter, setTypeFilter] = useState('Apple');
  var d1 = new Date();
  d1.setDate(d1.getDate()-430); //http://127.0.0.1:8000/positive_scores/Apple/2020-02-22/2021-02-21
  const [startDate, setStartDate] = useState(d1);
  var d2 = new Date();
  d2.setDate(d2.getDate()-100) //http://127.0.0.1:8000/positive_scores/Apple/2020-02-22/2021-02-21
  const [endDate, setEndDate] = useState(d2);
 


//for positive score
  useEffect(() => {
    const fetchData = () => {
      const result = axios.get(
        'http://127.0.0.1:8000/positive_scores/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),
      ).then((response) => {
        setPositiveScore(response.data)
      });
      //console.log(positiveScore);
    };
 
    fetchData();
  }, []);

  //for neutral score
  useEffect(() => {
    const fetchData = () => {
      const result = axios.get(
        'http://127.0.0.1:8000/neutral_scores/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),
      ).then((response) => {
        setNeutralScore(response.data)
      });
      //console.log(neutralScore);
    };
 
    fetchData();
  }, []);

  //for negative score
  useEffect(() => {
    const fetchData = () => {
      const result = axios.get(
        'http://127.0.0.1:8000/negative_scores/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),
      ).then((response) => {
        setNegativeScore(response.data)
      });
      //console.log(negativeScore);
    };
 
    fetchData();
  }, []);

  //for average sentiment
  useEffect(() => {
    const fetchData = () => {
      const result = axios.get(
        'http://127.0.0.1:8000/average_sentiment/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),
      ).then((response) => {
        setAverageSentiment(response.data)
      });
      //console.log(averageSentiment);
    };
 
    fetchData();
  }, []);

    //for positive headlines
    useEffect(() => {
      const fetchData = () => {
        const result = axios.get(
          'http://127.0.0.1:8000/top_positive_news/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),
          ).then((response) => {
          console.log(response.data)
          setPositiveNews(response.data)
        });
        // console.log(positiveNews);
      };
   
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = () => {
        const result = axios.get(
          'http://127.0.0.1:8000/top_negative_news/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),

        ).then((response) => {
          setNegativeNews(response.data)
        });
        // console.log(negativeNews);
      };
   
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = () => {
        const result = axios.get(
          'http://127.0.0.1:8000/headlines_scores/' + typeFilter + '/'+ String(startDate.toISOString().substring(0, 10)) +'/' + String(endDate.toISOString().substring(0, 10)),

        ).then((response) => {
          setHeadlinesScores(response.data)
        });
        // console.log(headlinesScores);
      };
   
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = () => {
        const result = axios.get(
          'http://127.0.0.1:8000/get_companies',

        ).then((response) => {
          setCompanies(response.data)
        });
        console.log(companies);
      };
   
      fetchData();
    }, []);
  

  return (
    <DefaultLayout>
      <div>
        <Link href="/department/machinelearning">
          <Button color="dark">Back</Button>
        </Link>
      </div>

      <Container className={styles.container}>
        <Row>
          <Col>
            <div className={styles.title}>
              <img src="https://www.flaticon.com/svg/static/icons/svg/3280/3280750.svg" alt="building icon" height="40px" width="40px"/>
	    	      Sentiment Analysis of NASDAQ Top 30 Companies
            </div>
            <div className={styles.description}>
            News data from the Top 30 NASDAQ companies were collected and processed using the FinBERT Sentiment Analysis Model
            </div>
          </Col>
          <Col xs lg="2">
            <Date title="Sentiment Scores of <Company> News"/>
          </Col>
	    	</Row>

        <Row className={styles.sectionone}>
          <Col>
            <Pie data={data3}/>
          </Col>
          <Col>
            <Number name="Positive" value= {positiveScore} color="#29cd6e"/>
          </Col>
          <Col>
            <Number name="Neutral" value={neutralScore} color="#eec612"/>
          </Col>
          <Col>
            <Number name="Negative" value={negativeScore} color="#e04f42"/>
          </Col>
          <Col>
            <Sentiment name="Average Sentiment" value={averageSentiment}/>
          </Col>
        </Row>

        <Row className={styles.sectiontwo}>
          <Dropdown items={companies} setSelected={setTypeFilter} />
            <DatePicker  
            selected={startDate} 
            onChange={date => setStartDate(date)} 
            // dateFormat="dd/mm/yy"
            />
            <DatePicker
            selected={endDate} 
            onChange={date => setEndDate(date)} 
            // dateFormat="dd/mm/yy"
            />
            {/* <App/> */}
            <Graph data={headlinesScores}/>

        </Row>

        <Row>
          <Col style={{"margin-left":'1rem'}}>
            <Table title="Top 5 Most Positive News" data={positiveNews}/>
          </Col>
          <Col style={{"margin-right":'1rem'}}>
            <Table title="Top 5 Most Negative News" data={negativeNews}/>
          </Col>
	    	</Row>
			</Container>
    </DefaultLayout>
  );
};

export default MachineLearningDashboard;