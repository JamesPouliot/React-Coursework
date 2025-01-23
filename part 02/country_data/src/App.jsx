import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const Country = ({ country, expanded, updateDisplayedCountries }) => {
	const name = country.name.common;

	if (!expanded) {
		return (
			<div>
				{name}
				<button onClick={() => updateDisplayedCountries(name)}>Show</button>
			</div>
		);
	} else {
		return (
			<div>
				<h2>{name}</h2>
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

	const handleSearchChange = event => {
		const updatedSearchWord = event.target.value;
		setSearchWord(updatedSearchWord);
		updateDisplayedCountries(updatedSearchWord);
	};

	const updateDisplayedCountries = partialName => {
		const searchTerm = partialName.toLowerCase();
		const updatedList = countries.filter(country => {
			return country.name.common.toLowerCase().includes(searchTerm);
		});
		setDisplayedCountries(updatedList);
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
								updateDisplayedCountries={updateDisplayedCountries}
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
								updateDisplayedCountries={updateDisplayedCountries}
							/>
						);
					})
				)}
			</div>
		</>
	);
};

export default App;
