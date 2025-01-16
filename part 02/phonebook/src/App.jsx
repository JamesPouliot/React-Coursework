import { useState } from "react";

const Number = (props) => {
	return <div>{props.person.name}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addName = (event) => {
		event.preventDefault();
		console.log("adding name: ", newName);
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} was already added to the phonebook.`);
		} else {
			const newNameObject = {
				name: newName,
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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNewNameChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Number key={person.name} person={person} />
			))}
			<div>debug: {newName}</div>
		</div>
	);
};

export default App;
