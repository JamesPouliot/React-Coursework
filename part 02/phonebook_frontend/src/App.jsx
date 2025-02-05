import { useState, useEffect } from 'react';
import axios from 'axios';
import personsService from './services/persons';

const Numbers = ({ filteredPersons, handleDeletion }) => {
	return (
		<>
			{' '}
			{filteredPersons.map(person => (
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

const PersonForm = props => {
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

const Notification = ({ alert }) => {
	const redAlertStyle = {
		color: alert[0],
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (alert.length === 0) {
		return null;
	} else {
		return <div style={redAlertStyle}>{alert[1]}</div>;
	}
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterWord, setFilterWord] = useState('');
	const [personToDelete, setIDToDelete] = useState('');
	const [alert, setAlert] = useState([]);

	useEffect(() => {
		personsService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons);
			})
			.catch(error => {
				console.log('error getting list');
			});
	}, []);

	const addPerson = event => {
		event.preventDefault();
		console.log('adding name: ', newName);
		if (persons.some(person => person.name === newName)) {
			if (
				window.confirm(
					`${newName} was already added to the phonebook. Would you like to change their number to ${newNumber}?`
				)
			) {
				console.log('yes, replace');
				const oldEntry = persons.find(person => person.name === newName);

				console.log('old entry:', oldEntry);
				const newEntry = { ...oldEntry, number: newNumber };
				console.log('new entry:', newEntry);
				personsService
					.update(newEntry.id, newEntry)
					.then(response => {
						console.log('update response is:', response);
						setPersons(
							persons.map(entry =>
								entry.id === newEntry.id ? newEntry : entry
							)
						);
						setAlert([
							'orange',
							`${newEntry.name}'s number changed to: ${newNumber}`,
						]);
						setTimeout(() => {
							setAlert([]);
						}, 5000);
					})
					.catch(error => {
						console.log('error altering number');
						setAlert([
							'red',
							`Error altering ${newName}. ${newName} was already deleted.`,
						]);
						setTimeout(() => {
							setAlert([]);
						}, 5000);
					});
			} else {
				console.log('no, do not replace');
			}
		} else {
			const newNameObject = {
				name: newName,
				number: newNumber,
			};
			console.log('new name object: ', newNameObject);

			personsService
				.create(newNameObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson));
					setAlert(['green', `${newName} created with number: ${newNumber}`]);
					setTimeout(() => {
						setAlert([]);
					}, 5000);
					setNewName('');
					setNewNumber('');
				})
				.catch(error => {
					console.log('already created this entry');
				});
		}
		console.log('new Persons is:', persons);
	};

	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(filterWord.toLowerCase())
	);

	const handleNewNameChange = event => {
		setNewName(event.target.value);
	};

	const handleNewNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleFilterWordChange = event => {
		setFilterWord(event.target.value);
	};

	const handleDeletion = deletedPerson => {
		const deletedPersonID = deletedPerson.id;
		setIDToDelete(deletedPersonID);
		console.log('attempting to delete ', deletedPerson.name);
		if (
			window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)
		) {
			personsService
				.removeEntry(deletedPersonID)
				.then(response => {
					setAlert(['green', `${deletedPerson.name} deleted`]);
					setTimeout(() => {
						setAlert([]);
					}, 5000);
				})
				.catch(error => {
					console.log('already deleted this entry');
				});
			setPersons(persons.filter(person => person.id !== deletedPersonID));
			console.log('new Persons is:');
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification alert={alert} />
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
