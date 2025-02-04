import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = newObject => {
	const request = axios.post(baseUrl, newObject);
	return request.then(response => response.data);
};

const update = (id, newPersonObject) => {
	console.log('attempting to update old entry to:', newPersonObject);
	console.log(`id is ${newPersonObject.id}`);
	return axios.put(`${baseUrl}/${id}`, newPersonObject);
};

const removeEntry = id => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default {
	getAll,
	create,
	update,
	removeEntry,
};
