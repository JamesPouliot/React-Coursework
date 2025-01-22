import { useState, useEffect } from 'react';
import countriesService from './services/countries'


const Countries = ({displayedCountries}) => {
  console.log('drawing all countries');
  console.log(console.log(displayedCountries));

  if (displayedCountries.length > 10) {
    return <div>Too many countries! Narrow your search</div>
  } else {
  return (
    <div>
    {displayedCountries.map(country => {
      return <Country key={country.name.common} country={country} />
    })}
    </div>
  )}
}

const Country = ({country}) => {
  console.log(`drawing country: ${country.name.common}`);
  return (<div>{country.name.common}</div>)
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
      console.log(country,"has search word?", country.name.common.toLowerCase().includes(updatedSearchWord));
      return country.name.common.toLowerCase().includes(updatedSearchWord);
    });
    setDisplayedCountries(updatedDisplayedCountries);
    console.log('display these countries:',updatedDisplayedCountries);
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
