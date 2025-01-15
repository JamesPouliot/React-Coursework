import { useState } from "react";

const randomize = (max) => {
	return Math.floor(Math.random() * max);
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const totalAnecdotes = anecdotes.length;
	console.log("totalAnecdotes", totalAnecdotes);

	const [votes, setVotes] = useState(new Array(totalAnecdotes).fill(0)); //create a zero-filled array with length totalAnecdotes
	console.log("votes", votes); //[0,0,0,0,0,0,0,0]

	const [selected, setSelected] = useState(0);

	const handleClick = () => {
		const newAnecdoteIndex = randomize(totalAnecdotes);
		setSelected(newAnecdoteIndex);
		console.log("total", totalAnecdotes);
		console.log("new anecdote index", newAnecdoteIndex);
	};

	const handleVote = (selected) => {
		const updatedVotes = [...votes];
		updatedVotes[selected] += 1;
		setVotes(updatedVotes);
		console.log("new votes for this anecdote", updatedVotes[selected]);
	};

	const mostVotes = () => {
		const voteMax = Math.max(...votes);
		const topAnecdoteIndex = votes.indexOf(voteMax);
		return topAnecdoteIndex;
	};

	return (
		<>
			<h2>Anecdote of the Day</h2>
			<Anecdote
				selectedAnecdote={anecdotes[selected]}
				votesForAnecdote={votes[selected]}
			/>
			<Button function={() => handleVote(selected)} text='Vote' />
			<Button function={handleClick} text='Next Anecdote' />
			<h2>Anecdote with most votes</h2>
			<Anecdote
				selectedAnecdote={anecdotes[mostVotes()]}
				votesForAnecdote={votes[mostVotes()]}
			/>
		</>
	);
};

const Button = (props) => {
	return <button onClick={props.function}>{props.text}</button>;
};

const Anecdote = (props) => {
	return (
		<div>
			<div>{props.selectedAnecdote}</div>
			<div>Has {props.votesForAnecdote} votes</div>
		</div>
	);
};

export default App;
