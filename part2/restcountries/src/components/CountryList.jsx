const CountryList = ({ countries }) => {
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
      </div>
    );
  }

  return <p>No matches found.</p>;
};

export default CountryList;
