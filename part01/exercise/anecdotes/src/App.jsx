import { useState } from "react";

const Display = ({ anecdote }) => (
  <div>
    <p>
      {anecdote.text}
      <br />
      has {anecdote.vote} votes
    </p>
  </div>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const initialAnecdotes = [
    { text: "If it hurts, do it more often.", vote: 0 },
    {
      text: "Adding manpower to a late software project makes it later!",
      vote: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0,
    },
    { text: "Premature optimization is the root of all evil.", vote: 0 },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      vote: 0,
    },
    { text: "The only way to go fast, is to go well.", vote: 0 },
  ];

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [selected, setSelected] = useState(0);

  const handleNextClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVoteClick = () => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selected] = {
      ...newAnecdotes[selected],
      vote: newAnecdotes[selected].vote + 1,
    };
    setAnecdotes(newAnecdotes);
  };

  const mostVoted = anecdotes.reduce((prev, current) =>
    current.vote > prev.vote ? current : prev
  );
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} />
      <Button onClick={handleVoteClick} text="vote"></Button>
      <Button onClick={handleNextClick} text="next anecdote"></Button>
      <h1>Anecdote with most votes</h1>
      <Display anecdote={mostVoted}></Display>
    </div>
  );
};

export default App;
