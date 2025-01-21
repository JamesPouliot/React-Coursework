import { useState, useEffect } from 'react';
import axios from 'axios';
import personsService from './services/persons';

const Numbers = ({ filteredPersons, handleDeletion }) => {
	return (
		<>
			{' '}
			{filteredPersons.map((person) => (
				<Number
					key={person.name}
					person={person}
					handleDeletion={handleDeletion}
				/>
			))}
		</>
	);
};

const Number = ({ person, handleDeletion }) => {
	return (
		<div>
			{person.name} {person.number}
			<button onClick={() => handleDeletion(person)} type="button">
				Delete
			</button>
		</div>
	);
};

const Filter = ({ filterWord, handler }) => {
	return <input value={filterWord} onChange={handler} />;
};

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name:{' '}
				<input value={props.newName} onChange={props.handleNewNameChange} />
			</div>
			<div>
				number:{' '}
				<input value={props.newNumber} onChange={props.handleNewNumberChange} />
			</div>

			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterWord, setFilterWord] = useState('');
	const [personToDelete, setIDToDelete] = useState('');

	useEffect(() => {
		personsService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filterWord.toLowerCase())
	);

	const addPerson = (event) => {
		event.preventDefault();
		console.log('adding name: ', newName);
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} was already added to the phonebook.`);
		} else {
			const newNameObject = {
				name: newName,
				number: newNumber,
			};
			console.log('new name object: ', newNameObject);

			personsService.create(newNameObject).then((response) => {
				setPersons(persons.concat(response.data));
				setNewName('');
				setNewNumber('');
			});
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

	const handleDeletion = (deletedPerson) => {
		const deletedPersonID = deletedPerson.id;
		setIDToDelete(deletedPersonID);
		console.log('attempting to delete ', deletedPerson.name);
		if (
			window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)
		) {
			personsService.removeEntry(deletedPersonID);
			setPersons(persons.filter((person) => person.id !== deletedPersonID));
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<h2>Filter</h2>
			<Filter filterWord={filterWord} handler={handleFilterWordChange} />
			<h2>Add New Number</h2>
			<PersonForm
				addPerson={addPerson}
				handleNewNameChange={handleNewNameChange}
				handleNewNumberChange={handleNewNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>
			<h2>Numbers found in search</h2>
			<Numbers
				filteredPersons={filteredPersons}
				handleDeletion={handleDeletion}
			/>
		</div>
	);
};

export default App;
