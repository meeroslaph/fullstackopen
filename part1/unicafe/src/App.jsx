import React, { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const StatisticsTable = ({ good, neutral, bad, all, average, positive }) => (
  <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={`${positive} %`} />
    </tbody>
  </table>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <StatisticsTable
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}
    />
  );
};

const App = () => {
  const title = "Give Feedback";
  const statisticsSection = "Statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={title} />
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Header text={statisticsSection} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
