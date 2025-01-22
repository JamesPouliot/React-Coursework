import { useState } from 'react';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	let all = good + neutral + bad;
	let average = (good - bad) / all;
	let positivePercentage = Math.round((good / all) * 100);

	const handleGoodClick = () => {
		console.log('Good Click -- Good before:', good);
		const updatedGood = good + 1;
		setGood(updatedGood);
		console.log('Good after:', updatedGood);
	};

	const handleNeutralClick = () => {
		console.log('Neutral Click -- Neutral before:', neutral);
		const updatedNeutral = neutral + 1;
		setNeutral(updatedNeutral);
		console.log('Neutral after:', updatedNeutral);
	};

	const handleBadClick = () => {
		console.log('Bad Click -- Bad before:', bad);
		const updatedBad = bad + 1;
		setBad(updatedBad);
		console.log('Bad after:', updatedBad);
	};

	return (
		<>
			<h1>Give Feedback</h1>
			<Button handleClick={handleGoodClick} text="good" />
			<Button handleClick={handleNeutralClick} text="neutral" />
			<Button handleClick={handleBadClick} text="bad" />
			<h2>Statistics</h2>

			<Statistics
				good={good}
				bad={bad}
				neutral={neutral}
				all={all}
				average={average}
				positivePercentage={positivePercentage}
			/>
		</>
	);
};

const Button = props => {
	return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = props => {
	if (props.all >= 1) {
		return (
			<table>
				<tbody>
					<StatisticLine text="Good" amount={props.good} />
					<StatisticLine text="Neutral" amount={props.neutral} />
					<StatisticLine text="Bad" amount={props.bad} />
					<StatisticLine text="All" amount={props.all} />
					<StatisticLine text="average" amount={props.average} />
					<StatisticLine
						text="positive"
						amount={props.positivePercentage + '%'}
					/>
				</tbody>
			</table>
		);
	} else {
		return <div>No Feedback Given</div>;
	}
};

const StatisticLine = props => {
	return (
		<tr>
			<th scope="row">{props.text}</th>
			<td>{props.amount}</td>
		</tr>
	);
};

export default App;
