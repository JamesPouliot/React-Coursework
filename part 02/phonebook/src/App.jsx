import { useState } from "react";

const Number = (props) => {
	return (
		<div>
			{props.person.name} {props.person.number}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		console.log("adding name: ", newName);
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} was already added to the phonebook.`);
		} else {
			const newNameObject = {
				name: newName,
				number: newNumber,
			};
			console.log("new name object: ", newNameObject);
			const updatedPersons = persons.concat(newNameObject);
			setPersons(updatedPersons);
			console.log(updatedPersons);
			// updatedPersons = persons.concat(person)
		}
	};

	const handleNewNameChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNewNumberChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNewNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNewNumberChange} />
				</div>

				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Number key={person.name} person={person} />
			))}
		</div>
	);
};

export default App;
