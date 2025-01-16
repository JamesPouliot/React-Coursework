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
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterWord, setFilterWord] = useState("");

	const filteredPersons = persons.filter((person) =>
		person.name.includes(filterWord)
	);
	console.log(filteredPersons);

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
		setNewName(event.target.value);
	};

	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterWordChange = (event) => {
		setFilterWord(event.target.value);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<h2>Filter</h2>
			<input value={filterWord} onChange={handleFilterWordChange} />
			<h2>Add New Number</h2>
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
			<h2>Numbers found in search</h2>
			{filteredPersons.map((person) => (
				<Number key={person.name} person={person} />
			))}
		</div>
	);
};

export default App;
