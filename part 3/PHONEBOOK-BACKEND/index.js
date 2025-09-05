const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('requestBody', function (req, res) {
	// return req.headers['content-length'];
	return JSON.stringify(req.body);
}); //defines a Morgan token that holds the request body. We'll call upon this token below to display it in the terminal

app.use(morgan(':method :url :status :res[content-length] - :response-time ms --- :requestBody'));

let persons = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = persons.find(person => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.get('/api/info', (request, response) => {
	const totalPersons = persons.length;
	const date = new Date().toString();
	response.send(`<p>Phonebook has info for ${totalPersons} people.</p><p>${date}</p>`);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	persons = persons.filter(person => person.id !== id);

	response.status(204).end();
});

const generateId = () => {
	const idInt = Math.floor(Math.random() * 10000);
	return String(idInt + 1);
};

app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name) {
		return response.status(400).json({ error: 'missing name' });
	}
	if (!body.number) {
		return response.status(400).json({ error: 'missing phone number' });
	}
	if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({ error: 'name already in phonebook' });
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(person);

	response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
