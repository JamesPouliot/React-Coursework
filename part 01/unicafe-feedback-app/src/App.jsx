import { useState } from "react";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	let all = good + neutral + bad;
	let average = (good - bad) / all;
	let positivePercentage = Math.round((good / all) * 100);

	const handleGoodClick = () => {
		console.log("Good Click -- Good before:", good);
		const updatedGood = good + 1;
		setGood(updatedGood);
		console.log("Good after:", updatedGood);
	};

	const handleNeutralClick = () => {
		console.log("Neutral Click -- Neutral before:", neutral);
		const updatedNeutral = neutral + 1;
		setNeutral(updatedNeutral);
		console.log("Neutral after:", updatedNeutral);
	};

	const handleBadClick = () => {
		console.log("Bad Click -- Bad before:", bad);
		const updatedBad = bad + 1;
		setBad(updatedBad);
		console.log("Bad after:", updatedBad);
	};

	return (
		<>
			<h1>Give Feedback</h1>
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
			<h2>Statistics</h2>
			<Statistics text='Good' amount={good} />
			<Statistics text='Neutral' amount={neutral} />
			<Statistics text='Bad' amount={bad} />
			<Statistics text='All' amount={all} />
			<Statistics text='average' amount={average} />
			<Statistics text='positive' amount={positivePercentage + "%"} />
		</>
	);
};

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
	return (
		<div>
			{props.text}: {props.amount}
		</div>
	);
};

export default App;
