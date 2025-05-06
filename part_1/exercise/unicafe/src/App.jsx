import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = ({ items }) => {
  if (isNaN(items[4].value)) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.text}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + bad + neutral;
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const stats = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "all", value: total },
    { text: "average", value: ((good - bad) / total).toPrecision(2) },
    { text: "positive", value: (100 * good / total).toPrecision(2) + '%' },
  ];
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics items={stats} />
    </div>
  );
};

export default App;
