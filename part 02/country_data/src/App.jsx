import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const Country = ({ country, expanded }) => {
	const [revealed, setRevealed] = useState(expanded);

	useEffect(() => {
		const updatedRevealed = expanded;
		console.log(`reveal useEffect triggered for ${country.name.common}`);
		setRevealed(updatedRevealed);
	}, [expanded]);

	const handleReveal = countryName => {
		console.log(`revealing: ${countryName}`);
		setRevealed(true);
	};

	console.log(
		`drawing country: ${country.name.common} as revealed:${revealed}`
	);
	if (!revealed) {
		return (
			<div>
				{country.name.common}
				<button onClick={() => handleReveal(country.name.common)}>Show</button>
			</div>
		);
	} else {
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>Capital(s): {country.capital.join(', ')}</p>
				<p>Area: {country.area}</p>
				<p>Language(s): {Object.values(country.languages).join(', ')}</p>
				<img src={country.flags.png} />
				<Weather country={country} />
			</div>
		);
	}
};

const Weather = ({ country }) => {
	const [weather, setWeather] = useState('');
	const [weatherIconURL, setWeatherIconURL] = useState('');

	useEffect(() => {
		console.log('weather component WEATHER useEffect running');
		countriesService
			.getWeather(country.latlng)
			.then(response => {
				setWeather(response.data);
			})
			.catch(error => {
				console.log('error getting weather');
			});
	}, []);

	useEffect(() => {
		weather.weather
			? setWeatherIconURL(
					`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
			  )
			: null;
	}, [weather]);

	return (
		<>
			<h3>Weather in {country.capital[0]}</h3>
			{weather ? (
				<>
					<p>Temperature: {weather.main.temp}&deg;F</p>
					<img src={weatherIconURL} />
					<p>Wind: {weather.wind.speed}mph</p>
				</>
			) : (
				<p>Loading weather data...</p>
			)}
		</>
	);
};

const App = () => {
	const [searchWord, setSearchWord] = useState('');
	const [countries, setCountries] = useState([]);
	const [displayedCountries, setDisplayedCountries] = useState([]);

	useEffect(() => {
		countriesService
			.getAll()
			.then(response => {
				setCountries(response.data);
			})
			.catch(error => {
				console.log('error getting list');
			});
	}, []);
	console.log(countries);

	const handleSearchChange = event => {
		const updatedSearchWord = event.target.value.toLowerCase();
		console.log('search word:', updatedSearchWord);
		setSearchWord(updatedSearchWord);

		const updatedDisplayedCountries = countries.filter(country => {
			return country.name.common.toLowerCase().includes(updatedSearchWord);
		});
		setDisplayedCountries(updatedDisplayedCountries);
	};

	return (
		<>
			<h1>Country Data</h1>
			<label>
				Search: <input onChange={handleSearchChange} value={searchWord} />
			</label>
			<div>
				{displayedCountries.length > 10 ? (
					<p>Too many countries! Narrow your search</p>
				) : displayedCountries.length === 1 ? (
					displayedCountries.map(country => {
						return (
							<Country
								key={country.name.common}
								country={country}
								expanded={true}
							/>
						);
					})
				) : (
					displayedCountries.map(country => {
						return (
							<Country
								key={country.name.common}
								country={country}
								expanded={false}
							/>
						);
					})
				)}
			</div>
		</>
	);
};

export default App;
