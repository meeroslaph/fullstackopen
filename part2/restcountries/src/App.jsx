import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountryList from "./components/CountryList";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery)
      );
      filtered.searched = true;
      setFilteredCountries(filtered);
    } else {
      const emptyResult = [];
      emptyResult.searched = false;
      setFilteredCountries(emptyResult);
    }
  };

  return (
    <div>
      Find countries: <input value={query} onChange={handleInputChange} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;
