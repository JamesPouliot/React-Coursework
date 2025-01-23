import { useState, useEffect } from 'react';
import countriesService from './services/countries'


const Countries = ({displayedCountries}) => {
  console.log('displaying these countries:');
  console.log(displayedCountries);

  if (displayedCountries.length > 10) {
    console.log('more than 10 countries');
    return <div>Too many countries! Narrow your search</div>
  }
  if (displayedCountries.length === 1) {  return (
    <div>
    {displayedCountries.map(country => {
      return <SingleCountry key={country.name.common} country={country} />
    })}
    </div>
  )
 } else {
  return (
    <div>
    {displayedCountries.map(country => {
      return <MultiCountry key={country.name.common} country={country} />
    })}
    </div>
  )}
}

const MultiCountry = ({country}) => {
  console.log(`drawing country: ${country.name.common}`);
  return (<div>{country.name.common}</div>)
}

const SingleCountry = ({country}) => {
  console.log(`just one country -- drawing: ${country.name.common}`)
  const plural = country.capital.length > 1 ? 's' : null;
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital{plural}: {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <img src={country.flags.png}/>

    </div>
  )
}

const App = () => {
	const [searchWord, setSearchWord] = useState('');
  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountries(response.data)
    }).catch(error => {console.log('error getting list')})
  }, [])
  console.log(countries);

	const handleSearchChange = event => {
    const updatedSearchWord = event.target.value.toLowerCase()
    console.log("search word:", updatedSearchWord);
		setSearchWord(updatedSearchWord);

    const updatedDisplayedCountries = countries.filter((country) => {
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
      <Countries displayedCountries={displayedCountries} />
		</>
	);
}

export default App;
