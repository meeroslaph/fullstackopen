import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length === 0 && !countries.searched) {
    return null;
  }

  if (countries.length === 0 && countries.searched) {
    return <p>No matches found.</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default CountryList;
