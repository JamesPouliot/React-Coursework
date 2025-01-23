import axios from 'axios';
const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const APIKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getAll = () => {
	return axios.get(allCountries);
};

const getWeather = latAndLong => {
	console.log(
		`countriesService.getWeather is getting weather at ${latAndLong}`
	);
	const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latAndLong[0]}&lon=${latAndLong[1]}&appid=${APIKey}&units=imperial`;
	console.log(`asking ${URL}`);
	return axios.get(URL);
};

export default {
	getAll,
	getWeather,
};
